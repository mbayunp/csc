import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface CourtAttributes {
  id: number;
  name: string;
  type: 'futsal' | 'badminton' | 'basket';
  price_per_hour: number;
  is_active: boolean;
}

interface CourtCreationAttributes extends Optional<CourtAttributes, 'id' | 'is_active'> {}

export class Court extends Model<CourtAttributes, CourtCreationAttributes> implements CourtAttributes {
  public id!: number;
  public name!: string;
  public type!: 'futsal' | 'badminton' | 'basket';
  public price_per_hour!: number;
  public is_active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Court.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('futsal', 'badminton', 'basket'),
      allowNull: false,
    },
    price_per_hour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'courts',
    timestamps: true,
  }
);
