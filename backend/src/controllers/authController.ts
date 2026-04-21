import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    // Exclude password from response safely
    const { password: _, ...userData } = newUser.toJSON();

    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: userData,
    });
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    const payload = {
      id: user.id,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET || 'csc_secret_key';
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });

    const { password: _, ...userData } = user.toJSON();

    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        token,
        user: userData,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
