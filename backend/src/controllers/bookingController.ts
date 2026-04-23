import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { sequelize, Booking, Court } from '../models';

export const createBooking = async (req: Request, res: Response) => {
  const { court_id, date, start_time, duration, customer_name, phone } = req.body;

  try {
    const result = await sequelize.transaction(async (t) => {
      // 1. Fetch Court to calculate price
      const court = await Court.findByPk(court_id, { transaction: t });
      if (!court) {
        throw new Error('COURT_NOT_FOUND');
      }
      if (court.is_active === false || Number(court.is_active) === 0) {
        throw new Error('COURT_INACTIVE');
      }

      // 2. Calculate end_time
      const startHour = parseInt(start_time.split(':')[0], 10);
      const startMinute = start_time.split(':')[1];
      const endHour = startHour + duration;
      const end_time = `${endHour.toString().padStart(2, '0')}:${startMinute}:00`;
      const formatted_start_time = `${start_time}:00`;

      // 3. Calculate total_price
      const total_price = duration * Number(court.price_per_hour);

      // 4. Overlap Query (Anti-Double Booking Logic)
      const overlappingBookings = await Booking.findAll({
        where: {
          court_id,
          date,
          status: {
            [Op.in]: ['pending', 'approved']
          },
          [Op.and]: [
            { start_time: { [Op.lt]: end_time } },
            { end_time: { [Op.gt]: formatted_start_time } }
          ]
        },
        transaction: t,
        lock: t.LOCK.UPDATE // Row-level locking to prevent race conditions during the transaction
      });

      if (overlappingBookings.length > 0) {
        throw new Error('OVERLAPPING_BOOKING');
      }

      // 5. Create Booking safely
      const booking = await Booking.create({
        court_id,
        date,
        start_time: formatted_start_time,
        end_time,
        duration,
        total_price,
        customer_name: customer_name || null,
        phone: phone || null,
        // user_id can be mapped if req.user is available
      }, { transaction: t });

      return booking;
    });

    return res.status(201).json({
      status: 'success',
      data: result
    });

  } catch (error: any) {
    if (error.message === 'COURT_NOT_FOUND') {
      return res.status(404).json({ status: 'error', message: 'Court not found' });
    }
    if (error.message === 'COURT_INACTIVE') {
      return res.status(400).json({ status: 'error', message: 'Court is inactive' });
    }
    if (error.message === 'OVERLAPPING_BOOKING') {
      return res.status(409).json({ status: 'error', message: 'The requested time slot is no longer available.' });
    }
    
    console.error('Booking Creation Error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const getAvailability = async (req: Request, res: Response) => {
  try {
    const { court_id, date } = req.query as { court_id: string, date: string };

    const bookings = await Booking.findAll({
      where: {
        court_id,
        date,
        status: {
          [Op.in]: ['pending', 'approved']
        }
      }
    });

    // Generate slots from 07:00 to 21:00
    const slots = [];
    for (let i = 7; i <= 21; i++) {
      slots.push(`${i.toString().padStart(2, '0')}:00`);
    }

    const availability = slots.map(slotTime => {
      // Logic: A slot is booked if it falls exactly or partially within an existing booking range
      const slotHour = parseInt(slotTime.split(':')[0], 10);
      
      const isBooked = bookings.some(booking => {
        const startHour = parseInt(booking.start_time.split(':')[0], 10);
        const endHour = parseInt(booking.end_time.split(':')[0], 10);
        
        // Slot is within [start_time, end_time)
        return slotHour >= startHour && slotHour < endHour;
      });

      return {
        time: slotTime,
        isBooked
      };
    });

    return res.status(200).json({
      status: 'success',
      data: availability
    });
  } catch (error) {
    console.error('Get Availability Error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const approveBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByPk(id as string);
    if (!booking) {
      return res.status(404).json({ status: 'error', message: 'Booking not found' });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({ status: 'error', message: `Booking cannot be approved because it is currently ${booking.status}` });
    }

    // Assign mock UUID for approved_by (simulate req.user.id)
    const dummyAdminId = '00000000-0000-0000-0000-000000000000';

    booking.status = 'approved';
    booking.approved_at = new Date();
    booking.approved_by = dummyAdminId;

    await booking.save();

    return res.status(200).json({
      status: 'success',
      message: 'Booking approved successfully',
      data: booking
    });
  } catch (error) {
    console.error('Approve Booking Error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const rejectBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByPk(id as string);
    if (!booking) {
      return res.status(404).json({ status: 'error', message: 'Booking not found' });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({ status: 'error', message: `Booking cannot be rejected because it is currently ${booking.status}` });
    }

    booking.status = 'rejected';
    await booking.save();

    return res.status(200).json({
      status: 'success',
      message: 'Booking rejected successfully',
      data: booking
    });
  } catch (error) {
    console.error('Reject Booking Error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
