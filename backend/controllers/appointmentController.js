import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Department from '../models/Department.js';
import { isMongoConnected, mockDbStore } from '../config/db.js';

// Generates a unique hospital booking identifier
function generateBookingId() {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `WC-${year}-${randomDigits}`;
}

export const createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      contact,
      phone,
      email,
      doctorId,
      departmentId,
      appointmentDate,
      appointmentTime,
      reason,
      notes
    } = req.body;

    // Validate required fields
    if (!patientName || !doctorId || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        message: 'Patient name, doctor, appointment date, and time are required'
      });
    }

    const patientPhone = contact?.phone || phone || '';
    const patientEmail = contact?.email || email || '';

    if (!patientPhone && !patientEmail) {
      return res.status(400).json({
        success: false,
        message: 'At least one contact method (phone or email) is required'
      });
    }

    // Lookup Doctor and Department details
    let doctor;
    let department;

    if (isMongoConnected) {
      doctor = await Doctor.findOne({ doctorId });
      if (departmentId) {
        department = await Department.findOne({ departmentId: departmentId.toLowerCase() });
      } else if (doctor) {
        department = await Department.findOne({ departmentId: doctor.departmentId });
      }
    } else {
      doctor = await mockDbStore.findDoctorById(doctorId);
      if (departmentId) {
        department = await mockDbStore.findDepartmentById(departmentId);
      } else if (doctor) {
        department = await mockDbStore.findDepartmentById(doctor.departmentId);
      }
    }

    const doctorName = doctor ? doctor.name : 'Attending Specialist';
    const deptId = department ? department.departmentId : (doctor ? doctor.departmentId : 'general-medicine');
    const deptName = department ? department.name : (doctor ? doctor.department : 'General Medicine');

    const bookingId = generateBookingId();

    const appointmentPayload = {
      bookingId,
      patientName: patientName.trim(),
      contact: {
        phone: patientPhone.trim(),
        email: patientEmail.trim().toLowerCase()
      },
      doctorId,
      doctorName,
      departmentId: deptId,
      departmentName: deptName,
      appointmentDate,
      appointmentTime,
      reason: reason ? reason.trim() : 'General Consultation',
      notes: notes || '',
      status: 'Pending'
    };

    let savedAppointment;

    if (isMongoConnected) {
      const apptDoc = new Appointment(appointmentPayload);
      savedAppointment = await apptDoc.save();
    } else {
      savedAppointment = await mockDbStore.createAppointment(appointmentPayload);
    }

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: savedAppointment
    });
  } catch (error) {
    console.error('createAppointment error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create appointment',
      error: error.message
    });
  }
};

export const getAppointmentByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      });
    }

    let appointment;

    if (isMongoConnected) {
      appointment = await Appointment.findOne({
        bookingId: { $regex: new RegExp(`^${bookingId.trim()}$`, 'i') }
      });
    } else {
      appointment = await mockDbStore.findAppointmentByBookingId(bookingId);
    }

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `No appointment found with Booking ID "${bookingId}"`
      });
    }

    return res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('getAppointmentByBookingId error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve appointment',
      error: error.message
    });
  }
};
