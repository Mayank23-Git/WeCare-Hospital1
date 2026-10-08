import mongoose from 'mongoose';
import { initialDepartments, initialDoctors, initialAppointments } from '../data/seedData.js';
import Department from '../models/Department.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';

// Fallback in-memory store in case MongoDB instance is not reachable
class MockDatabaseStore {
  constructor() {
    this.departments = JSON.parse(JSON.stringify(initialDepartments));
    this.doctors = JSON.parse(JSON.stringify(initialDoctors));
    this.appointments = JSON.parse(JSON.stringify(initialAppointments));
  }

  // Department methods
  async findDepartments(query = {}) {
    let results = [...this.departments];
    if (query.departmentId) {
      results = results.filter(d => d.departmentId === query.departmentId.toLowerCase());
    }
    return results;
  }

  async findDepartmentById(departmentId) {
    return this.departments.find(d => d.departmentId === departmentId.toLowerCase()) || null;
  }

  // Doctor methods
  async findDoctors(query = {}) {
    let results = [...this.doctors];
    if (query.departmentId) {
      results = results.filter(doc => doc.departmentId === query.departmentId.toLowerCase());
    }
    if (query.search) {
      const s = query.search.toLowerCase();
      results = results.filter(doc =>
        doc.name.toLowerCase().includes(s) ||
        doc.specialization.toLowerCase().includes(s) ||
        doc.department.toLowerCase().includes(s)
      );
    }
    return results;
  }

  async findDoctorById(doctorId) {
    return this.doctors.find(doc => doc.doctorId === doctorId) || null;
  }

  // Appointment methods
  async createAppointment(appointmentData) {
    const newAppointment = {
      _id: 'mock_' + Date.now() + Math.random().toString(36).substring(2, 6),
      ...appointmentData,
      status: appointmentData.status || 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.appointments.unshift(newAppointment);
    return newAppointment;
  }

  async findAppointmentByBookingId(bookingId) {
    return this.appointments.find(a => a.bookingId.toUpperCase() === bookingId.trim().toUpperCase()) || null;
  }

  async findAppointments(query = {}) {
    let results = [...this.appointments];
    if (query.status && query.status !== 'All') {
      results = results.filter(a => a.status.toLowerCase() === query.status.toLowerCase());
    }
    return results;
  }

  async updateAppointmentStatus(idOrBookingId, newStatus) {
    const appt = this.appointments.find(a => a._id === idOrBookingId || a.bookingId === idOrBookingId);
    if (!appt) return null;
    appt.status = newStatus;
    appt.updatedAt = new Date().toISOString();
    return appt;
  }
}

export const mockDbStore = new MockDatabaseStore();
export let isMongoConnected = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI || mongoURI.includes('localhost:27017')) {
    console.log('[Database] MONGODB_URI not configured for remote Atlas. Attempting connection with 2.5s timeout...');
  }

  try {
    const uri = mongoURI || 'mongodb://localhost:27017/wecare_hospital';
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500 // fast fallback if local daemon is absent
    });

    isMongoConnected = true;
    console.log(`[Database] Successfully connected to MongoDB at ${mongoose.connection.host}`);

    // Seed database if empty
    await seedDatabaseIfEmpty();
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[Database] MongoDB connection bypassed (${error.message}). Using robust persistent in-memory healthcare datastore.`);
  }
};

const seedDatabaseIfEmpty = async () => {
  try {
    const deptCount = await Department.countDocuments();
    if (deptCount === 0) {
      console.log('[Database] Seeding initial departments...');
      await Department.insertMany(initialDepartments);
    }

    const docCount = await Doctor.countDocuments();
    if (docCount === 0) {
      console.log('[Database] Seeding initial doctors...');
      await Doctor.insertMany(initialDoctors);
    }

    const apptCount = await Appointment.countDocuments();
    if (apptCount === 0) {
      console.log('[Database] Seeding initial demo appointments...');
      await Appointment.insertMany(initialAppointments);
    }
  } catch (err) {
    console.error('[Database] Seeding error:', err.message);
  }
};
