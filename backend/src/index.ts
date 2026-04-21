import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import authRoutes from './routes/authRoutes';
import bookingRoutes from './routes/bookingRoutes';
import reportRoutes from './routes/reportRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Global Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/reports', reportRoutes);

// Global Error Handler (Must be mounted last)
app.use(errorHandler);

// Database Sync & Server Initialization
const startServer = async () => {
  try {
    // NOTE: alter: true is very convenient for development.
    // In a strict production environment, you should use migrations.
    const isDev = process.env.NODE_ENV !== 'production';
    await sequelize.sync({ alter: isDev });
    console.log('Database connected and models synced successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
