import type { Request, Response } from 'express';
import { Op } from 'sequelize';
import { sequelize, Booking, Court } from '../models';

export const getDailyRevenue = async (req: Request, res: Response) => {
  try {
    const { start_date, end_date } = req.query;

    const dateFilter: any = {};
    if (start_date && end_date) {
      dateFilter.approved_at = {
        [Op.between]: [new Date(`${start_date}T00:00:00Z`), new Date(`${end_date}T23:59:59Z`)]
      };
    } else if (start_date) {
      dateFilter.approved_at = {
        [Op.gte]: new Date(`${start_date}T00:00:00Z`)
      };
    } else if (end_date) {
      dateFilter.approved_at = {
        [Op.lte]: new Date(`${end_date}T23:59:59Z`)
      };
    }

    // Use sequelize.fn('DATE') to extract just the date portion from approved_at
    const dailyRevenue = await Booking.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('approved_at')), 'date'],
        [sequelize.fn('SUM', sequelize.col('total_price')), 'total_revenue']
      ],
      where: {
        status: 'approved',
        ...dateFilter
      },
      group: [sequelize.fn('DATE', sequelize.col('approved_at'))],
      order: [[sequelize.fn('DATE', sequelize.col('approved_at')), 'DESC']]
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
