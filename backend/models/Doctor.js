import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    department: {
      type: String,
      required: true
    },
    departmentId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    specialization: {
      type: String,
      required: true
    },
    experience: {
      type: String,
      required: true
    },
    biography: {
      type: String,
      required: true
    },
    availability: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 4.8
    },
    consultationFee: {
      type: Number,
      default: 80
    },
    qualifications: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export default Doctor;
