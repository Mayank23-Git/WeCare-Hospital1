// API service layer for WeCare Hospital frontend

const API_BASE = '/api';

export const apiService = {
  // Departments
  async getDepartments() {
    const res = await fetch(`${API_BASE}/departments`);
    if (!res.ok) throw new Error('Failed to load departments');
    return res.json();
  },

  async getDepartmentById(id) {
    const res = await fetch(`${API_BASE}/departments/${id}`);
    if (!res.ok) throw new Error(`Department ${id} not found`);
    return res.json();
  },

  // Doctors
  async getDoctors(department = '', search = '') {
    const params = new URLSearchParams();
    if (department && department !== 'all') params.append('department', department);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/doctors?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to load doctors');
    return res.json();
  },

  async getDoctorById(id) {
    const res = await fetch(`${API_BASE}/doctors/${id}`);
    if (!res.ok) throw new Error(`Doctor ${id} not found`);
    return res.json();
  },

  // Appointments
  async createAppointment(appointmentData) {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to submit appointment');
    return data;
  },

  async getAppointmentByBookingId(bookingId) {
    const res = await fetch(`${API_BASE}/appointments/${encodeURIComponent(bookingId.trim())}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `No appointment found with ID "${bookingId}"`);
    return data;
  },

  // AI Doctor Recommendation Assistant
  async getDoctorRecommendation(symptoms) {
    const res = await fetch(`${API_BASE}/ai/doctor-recommendation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'AI Assistant is currently busy. Please try again or browse doctors directly.');
    return data;
  },

  // AI Skin Health Assistant
  async analyzeSkinHealth(image, mimeType = 'image/jpeg') {
    const res = await fetch(`${API_BASE}/ai/skin-analysis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image, mimeType })
    });
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(data.message || 'Skin analysis request failed.');
      error.isInvalidFace = data.isInvalidFace;
      error.errorCode = data.errorCode;
      error.dermatologyDoctors = data.dermatologyDoctors;
      throw error;
    }
    return data;
  },

  // Admin Portal
  async adminLogin(identifier, password) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Invalid administrator credentials');
    return data;
  },

  async getAdminAppointments(status = 'All', search = '', token = '') {
    const params = new URLSearchParams();
    if (status && status !== 'All') params.append('status', status);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/admin/appointments?${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch admin appointments');
    return data;
  },

  async updateAppointmentStatus(id, status, token = '') {
    const res = await fetch(`${API_BASE}/admin/appointments/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update appointment status');
    return data;
  },

  async getAdminStats(token = '') {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch admin statistics');
    return data;
  }
};
