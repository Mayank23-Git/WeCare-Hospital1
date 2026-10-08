import express from 'express';
import { createAppointment, getAppointmentByBookingId } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/:bookingId', getAppointmentByBookingId);

export default router;
