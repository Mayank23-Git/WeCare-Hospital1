import express from 'express';
import {
  adminLogin,
  getAdminAppointments,
  updateAppointmentStatus,
  getAdminStats
} from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public admin authentication endpoint
router.post('/login', adminLogin);

// Protected admin endpoints
router.get('/stats', protectAdmin, getAdminStats);
router.get('/appointments', protectAdmin, getAdminAppointments);
router.patch('/appointments/:id/status', protectAdmin, updateAppointmentStatus);

export default router;
