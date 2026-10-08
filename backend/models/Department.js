import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    departmentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    specialization: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'Activity'
    },
    headOfDepartment: {
      type: String,
      default: ''
    },
    roomLocation: {
      type: String,
      default: ''
    },
    emergencyAvailable: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Prevent re-compilation during hot-reloads
const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema);

export default Department;
