import Department from '../models/Department.js';
import { isMongoConnected, mockDbStore } from '../config/db.js';

export const getDepartments = async (req, res) => {
  try {
    let departments;
    if (isMongoConnected) {
      departments = await Department.find({}).sort({ name: 1 });
    } else {
      departments = await mockDbStore.findDepartments({});
    }
    return res.status(200).json({
      success: true,
      count: departments.length,
      data: departments
    });
  } catch (error) {
    console.error('getDepartments error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve departments',
      error: error.message
    });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    let department;
    if (isMongoConnected) {
      department = await Department.findOne({ departmentId: id.toLowerCase() });
    } else {
      department = await mockDbStore.findDepartmentById(id);
    }

    if (!department) {
      return res.status(404).json({
        success: false,
        message: `Department with ID '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error('getDepartmentById error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve department',
      error: error.message
    });
  }
};
