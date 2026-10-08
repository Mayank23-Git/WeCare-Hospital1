import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { apiService } from '../services/api.js';
import StatusBadge from '../components/StatusBadge.jsx';

export default function BookingPage({
  departments,
  doctors,
  selectedDepartment,
  setSelectedDepartment,
  selectedDoctor,
  setSelectedDoctor,
  setActivePage,
  setTrackBookingId
}) {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('10:00 AM');
  const [reason, setReason] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [copied, setCopied] = useState(false);

  // Time slot options
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  // Set default minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    if (!appointmentDate) {
      setAppointmentDate(minDateString);
    }
  }, [minDateString, appointmentDate]);

  // Filter doctors based on selected department
  const filteredDoctors = selectedDepartment && selectedDepartment !== 'all'
    ? doctors.filter(d => d.departmentId.toLowerCase() === selectedDepartment.toLowerCase())
    : doctors;

  // Auto-select first doctor of department if currently selected doctor does not match department
  const handleDepartmentChange = (deptId) => {
    setSelectedDepartment(deptId);
    const matchingDocs = doctors.filter(d => d.departmentId.toLowerCase() === deptId.toLowerCase());
    if (matchingDocs.length > 0) {
      setSelectedDoctor(matchingDocs[0]);
    } else {
      setSelectedDoctor(null);
    }
  };

  const handleDoctorChange = (docId) => {
    const doc = doctors.find(d => d.doctorId === docId);
    if (doc) {
      setSelectedDoctor(doc);
      setSelectedDepartment(doc.departmentId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!patientName.trim()) {
      setError('Please provide the patient full name.');
      return;
    }

    if (!phone.trim() && !email.trim()) {
      setError('Please provide at least a contact phone number or email address.');
      return;
    }

    if (!selectedDoctor) {
      setError('Please choose a doctor for your consultation.');
      return;
    }

    if (!appointmentDate) {
      setError('Please choose a preferred appointment date.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        patientName: patientName.trim(),
        contact: {
          phone: phone.trim(),
          email: email.trim()
        },
        doctorId: selectedDoctor.doctorId,
        doctorName: selectedDoctor.name,
        departmentId: selectedDoctor.departmentId,
        departmentName: selectedDoctor.department,
        appointmentDate,
        appointmentTime,
        reason: reason.trim() || 'General Consultation'
      };

      const response = await apiService.createAppointment(payload);
      setConfirmation(response.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'An error occurred while booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyBookingId = () => {
    if (confirmation?.bookingId) {
      navigator.clipboard.writeText(confirmation.bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleTrackThisBooking = () => {
    if (confirmation?.bookingId) {
      setTrackBookingId(confirmation.bookingId);
      setActivePage('track');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-20 space-y-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/30">
            Outpatient Services
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Schedule Your Hospital Appointment
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Directly reserve a slot with our specialist physicians. Instant confirmation and Booking ID generated immediately.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SUCCESS CONFIRMATION CARD */}
        {confirmation ? (
          <div className="bg-white rounded-3xl border border-emerald-200 shadow-2xl p-8 sm:p-10 space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Booking Successfully Received
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Appointment Scheduled
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your consultation request has been submitted to the WeCare clinical administration. Save your unique Booking ID to track your status.
              </p>
            </div>

            {/* Prominent Booking ID Box */}
            <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-teal-300 tracking-wider">
                  Your Unique Booking ID
                </span>
                <div className="text-3xl font-mono font-extrabold tracking-wider mt-1">
                  {confirmation.bookingId}
                </div>
              </div>

              <button
                onClick={copyBookingId}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 text-xs font-bold border border-teal-400/40 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Booking ID'}</span>
              </button>
            </div>

            {/* Appointment Details Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-semibold">Patient Name</span>
                <div className="font-bold text-slate-900 text-sm">{confirmation.patientName}</div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-semibold">Current Status</span>
                <div>
                  <StatusBadge status={confirmation.status} />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-semibold">Doctor Assigned</span>
                <div className="font-bold text-slate-900 text-sm">{confirmation.doctorName}</div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-semibold">Department</span>
                <div className="font-bold text-slate-900 text-sm">{confirmation.departmentName}</div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-semibold">Date & Time</span>
                <div className="font-bold text-slate-900 text-sm">
                  {confirmation.appointmentDate} at {confirmation.appointmentTime}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-semibold">Primary Concern</span>
                <div className="text-slate-700 font-medium">{confirmation.reason || 'General Consultation'}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleTrackThisBooking}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-600/25 transition"
              >
                <span>Track this Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setConfirmation(null);
                  setPatientName('');
                  setReason('');
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* BOOKING FORM */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Form Top Callout */}
            <div className="bg-teal-50/70 border-b border-teal-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-teal-700 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-teal-900">Direct Patient Scheduling</h3>
                  <p className="text-xs text-teal-700">All submissions are triaged by our registered hospital nursing staff.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActivePage('ai-assistant');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-white hover:bg-teal-100/50 px-3.5 py-2 rounded-xl border border-teal-200 transition shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Need Department Help? Ask AI</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              {error && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Step 1: Department & Doctor Selection */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">1</span>
                  Select Department & Doctor
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Department dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Hospital Department *</label>
                    <select
                      value={selectedDepartment || 'cardiology'}
                      onChange={(e) => handleDepartmentChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
                      required
                    >
                      {departments.map((d) => (
                        <option key={d.departmentId} value={d.departmentId}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Doctor dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Attending Doctor *</label>
                    <select
                      value={selectedDoctor?.doctorId || ''}
                      onChange={(e) => handleDoctorChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
                      required
                    >
                      <option value="" disabled>-- Select Doctor --</option>
                      {filteredDoctors.map((doc) => (
                        <option key={doc.doctorId} value={doc.doctorId}>
                          {doc.name} ({doc.specialization})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Selected Doctor Summary Card */}
                {selectedDoctor && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                    <img
                      src={selectedDoctor.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80"}
                      alt={selectedDoctor.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white shadow-xs"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-900 truncate">{selectedDoctor.name}</div>
                      <div className="text-[11px] text-teal-700 font-medium truncate">{selectedDoctor.specialization}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Availability: {selectedDoctor.availability}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Patient Information */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">2</span>
                  Patient Identification & Contact
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-1 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Patient Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. John Doe"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address (Optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Date, Time & Reason */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">3</span>
                  Preferred Slot & Clinical Problem
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Consultation Date *</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        min={minDateString}
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Preferred Time Slot *</label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
                        required
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Reason for Visit / Primary Symptoms (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your symptoms or reason for visit (e.g. routine checkup, recurring knee pain for 2 weeks, throat discomfort)..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-xl shadow-teal-600/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Appointment to Hospital...</span>
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="w-5 h-5" />
                      <span>Confirm & Book Appointment</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2.5">
                  Initial booking status will be set to "Pending" and can be tracked in real-time.
                </p>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
