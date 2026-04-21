import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';
import { Court } from './Court';

interface BookingAttributes {
  id: string;
  user_id?: string | null;
  customer_name?: string | null;
  phone?: string | null;
  court_id: number;
  date: string; // DATEONLY 'YYYY-MM-DD'
  start_time: string; // TIME 'HH:MM:SS'
  end_time: string; // TIME 'HH:MM:SS'
  duration: number; // in hours
  total_price: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approved_by?: string | null;
  approved_at?: Date | null;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id' | 'status'> {}

export class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  public id!: string;
  public user_id!: string | null;
  public customer_name!: string | null;
  public phone!: string | null;
  public court_id!: number;
  public date!: string;
  public start_time!: string;
  public end_time!: string;
  public duration!: number;
  public total_price!: number;
  public status!: 'pending' | 'approved' | 'rejected' | 'cancelled';
  public approved_by!: string | null;
  public approved_at!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  // Associations
  public readonly Customer?: User;
  public readonly Approver?: User;
  public readonly Court?: Court;
}

Booking.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    court_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courts',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'cancelled'),
      defaultValue: 'pending',
      allowNull: false,
    },
    approved_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    approved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'bookings',
    timestamps: true,
  }
);
