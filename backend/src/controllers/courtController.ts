import { Request, Response } from 'express';
import { Court } from '../models';

export const getAllCourts = async (req: Request, res: Response) => {
  try {
    const courts = await Court.findAll({
      order: [['createdAt', 'ASC']]
    });

    return res.status(200).json({
      status: 'success',
      data: courts
    });
  } catch (error) {
    console.error('Get All Courts Error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const createCourt = async (req: Request, res: Response) => {
  try {
    const { name, type, price_per_hour, is_active } = req.body;

    if (!name || !type || !price_per_hour) {
      return res.status(400).json({ status: 'error', message: 'Pastikan nama, tipe, dan harga per jam terisi.' });
    }

    const newCourt = await Court.create({
      name,
      type,
      price_per_hour,
      is_active: is_active !== undefined ? is_active : true
    });

    return res.status(201).json({
      status: 'success',
      message: 'Lapangan berhasil ditambahkan',
      data: newCourt
    });
  } catch (error: any) {
    console.error('Create Court Error:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateCourt = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { is_active, name, type, price_per_hour } = req.body;

    const court = await Court.findByPk(id as string);

    if (!court) {
      return res.status(404).json({ status: 'error', message: 'Lapangan tidak ditemukan' });
    }

    if (is_active !== undefined) court.is_active = is_active;
    if (name !== undefined) court.name = name;
    if (type !== undefined) court.type = type;
    if (price_per_hour !== undefined) court.price_per_hour = price_per_hour;

    await court.save();

    return res.status(200).json({
      status: 'success',
      message: 'Lapangan berhasil diupdate',
      data: court
    });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteCourt = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const court = await Court.findByPk(id as string);

    if (!court) {
      return res.status(404).json({ status: 'error', message: 'Lapangan tidak ditemukan' });
    }

    await court.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'Lapangan berhasil dihapus'
    });
  } catch (error: any) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({ 
        status: 'error', 
        message: 'Lapangan tidak dapat dihapus karena masih memiliki riwayat booking.' 
      });
    }
    console.error('Delete Court Error:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
};
