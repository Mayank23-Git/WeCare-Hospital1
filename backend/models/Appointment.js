import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    patientName: {
      type: String,
      required: true,
      trim: true
    },
    contact: {
      phone: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      }
    },
    doctorId: {
      type: String,
      required: true
    },
    doctorName: {
      type: String,
      required: true
    },
    departmentId: {
      type: String,
      required: true,
      lowercase: true
    },
    departmentName: {
      type: String,
      required: true
    },
    appointmentDate: {
      type: String,
      required: true
    },
    appointmentTime: {
      type: String,
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Waiting', 'Confirmed', 'Cancelled'],
      default: 'Pending'
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

export default Appointment;
