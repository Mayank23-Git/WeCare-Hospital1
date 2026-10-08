import Doctor from '../models/Doctor.js';
import { isMongoConnected, mockDbStore } from '../config/db.js';

export const getDoctors = async (req, res) => {
  try {
    const { department, search } = req.query;
    let doctors;

    if (isMongoConnected) {
      const query = {};
      if (department && department !== 'all') {
        query.departmentId = department.toLowerCase();
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { specialization: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } }
        ];
      }
      doctors = await Doctor.find(query).sort({ rating: -1, name: 1 });
    } else {
      doctors = await mockDbStore.findDoctors({
        departmentId: (department && department !== 'all') ? department : null,
        search
      });
    }

    return res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    console.error('getDoctors error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve doctors',
      error: error.message
    });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    let doctor;

    if (isMongoConnected) {
      doctor = await Doctor.findOne({ doctorId: id });
    } else {
      doctor = await mockDbStore.findDoctorById(id);
    }

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: `Doctor with ID '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error('getDoctorById error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve doctor details',
      error: error.message
    });
  }
};
