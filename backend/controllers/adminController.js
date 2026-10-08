import jwt from 'jsonwebtoken';
import Appointment from '../models/Appointment.js';
import { isMongoConnected, mockDbStore } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'wecare_super_secret_jwt_key_2026_secure';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@wecarehospital.com';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wecareAdmin2026!';

export const adminLogin = async (req, res) => {
  try {
    const { identifier, username, email, password } = req.body;
    const inputIdentifier = (identifier || username || email || '').trim().toLowerCase();
    const inputPassword = password ? password.trim() : '';

    if (!inputIdentifier || !inputPassword) {
      return res.status(400).json({
        success: false,
        message: 'Username/Email and password are required.'
      });
    }

    const isValidUser = (inputIdentifier === ADMIN_USERNAME.toLowerCase() || inputIdentifier === ADMIN_EMAIL.toLowerCase());
    const isValidPassword = (inputPassword === ADMIN_PASSWORD);

    if (!isValidUser || !isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative credentials.'
      });
    }

    const token = jwt.sign(
      {
        role: 'admin',
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful',
      token,
      admin: {
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        role: 'Hospital Administrator'
      }
    });
  } catch (error) {
    console.error('adminLogin error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed due to internal error',
      error: error.message
    });
  }
};

export const getAdminAppointments = async (req, res) => {
  try {
    const { status, search } = req.query;
    let appointments;

    if (isMongoConnected) {
      const query = {};
      if (status && status !== 'All') {
        query.status = status;
      }
      if (search) {
        query.$or = [
          { bookingId: { $regex: search, $options: 'i' } },
          { patientName: { $regex: search, $options: 'i' } },
          { doctorName: { $regex: search, $options: 'i' } },
          { departmentName: { $regex: search, $options: 'i' } }
        ];
      }
      appointments = await Appointment.find(query).sort({ createdAt: -1 });
    } else {
      appointments = await mockDbStore.findAppointments({ status });
      if (search) {
        const s = search.toLowerCase();
        appointments = appointments.filter(a =>
          a.bookingId.toLowerCase().includes(s) ||
          a.patientName.toLowerCase().includes(s) ||
          a.doctorName.toLowerCase().includes(s) ||
          a.departmentName.toLowerCase().includes(s)
        );
      }
    }

    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('getAdminAppointments error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve appointments list',
      error: error.message
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Waiting', 'Confirmed', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    let updatedAppointment;

    if (isMongoConnected) {
      updatedAppointment = await Appointment.findOneAndUpdate(
        { $or: [{ _id: id }, { bookingId: id }] },
        { $set: { status } },
        { new: true }
      );
    } else {
      updatedAppointment = await mockDbStore.updateAppointmentStatus(id, status);
    }

    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        message: `Appointment with identifier '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      message: `Appointment status successfully updated to ${status}`,
      data: updatedAppointment
    });
  } catch (error) {
    console.error('updateAppointmentStatus error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update appointment status',
      error: error.message
    });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    let allAppointments;
    if (isMongoConnected) {
      allAppointments = await Appointment.find({}).lean();
    } else {
      allAppointments = await mockDbStore.findAppointments({});
    }

    const stats = {
      total: allAppointments.length,
      pending: allAppointments.filter(a => a.status === 'Pending').length,
      waiting: allAppointments.filter(a => a.status === 'Waiting').length,
      confirmed: allAppointments.filter(a => a.status === 'Confirmed').length,
      cancelled: allAppointments.filter(a => a.status === 'Cancelled').length
    };

    return res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('getAdminStats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve administrative statistics',
      error: error.message
    });
  }
};
