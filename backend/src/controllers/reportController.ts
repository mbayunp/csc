import type { Request, Response } from 'express';
import { Op } from 'sequelize';
import { sequelize, Booking, Court } from '../models';

export const getDailyRevenue = async (req: Request, res: Response) => {
  try {
    const { start_date, end_date } = req.query;

    const dateFilter: any = {};
    if (start_date && end_date) {
      dateFilter.date = {
        [Op.between]: [start_date, end_date]
      };
    } else if (start_date) {
      dateFilter.date = {
        [Op.gte]: start_date
      };
    } else if (end_date) {
      dateFilter.date = {
        [Op.lte]: end_date
      };
    }

    const dailyRevenue = await Booking.findAll({
      attributes: [
        'date',
        [sequelize.fn('SUM', sequelize.col('total_price')), 'total_revenue']
      ],
      where: {
        status: 'approved',
        ...dateFilter
      },
      group: ['date'],
      order: [['date', 'ASC']]
    });

    return res.status(200).json({
      status: 'success',
      data: dailyRevenue
    });
  } catch (error) {
    console.error('Get Daily Revenue Error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const getRevenueByCourt = async (req: Request, res: Response) => {
  try {
    const revenueByCourt = await Booking.findAll({
      attributes: [
        'court_id',
        [sequelize.fn('SUM', sequelize.col('total_price')), 'total_revenue']
      ],
      where: {
        status: 'approved'
      },
      include: [
        {
          model: Court,
          attributes: ['name', 'type'],
        }
      ],
      // MySQL requires included attributes in GROUP BY when doing aggregation
      group: ['court_id', 'Court.id'], 
    });

    return res.status(200).json({
      status: 'success',
      data: revenueByCourt
    });
  } catch (error) {
    console.error('Get Revenue By Court Error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
