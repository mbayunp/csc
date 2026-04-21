import { User } from './User';
import { Court } from './Court';
import { Booking } from './Booking';
import { sequelize } from '../config/database';

// User Associations
User.hasMany(Booking, { foreignKey: 'user_id' });
User.hasMany(Booking, { foreignKey: 'approved_by', as: 'ApprovedBookings' });

// Court Associations
Court.hasMany(Booking, { foreignKey: 'court_id' });

// Booking Associations
Booking.belongsTo(User, { as: 'Customer', foreignKey: 'user_id' });
Booking.belongsTo(User, { as: 'Approver', foreignKey: 'approved_by' });
Booking.belongsTo(Court, { foreignKey: 'court_id' });

export {
  sequelize,
  User,
  Court,
  Booking
};
