import React, { useState, useEffect } from 'react';
import {
  Search,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';
import { apiService } from '../services/api.js';
import StatusBadge from '../components/StatusBadge.jsx';

export default function TrackBookingPage({ initialBookingId = '', setActivePage }) {
  const [bookingIdInput, setBookingIdInput] = useState(initialBookingId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [appointment, setAppointment] = useState(null);
  const [copied, setCopied] = useState(false);

  // Sample IDs for immediate demonstration
  const sampleIds = ['WC-2026-90214', 'WC-2026-88102', 'WC-2026-74521'];

  const fetchAppointment = async (idToSearch) => {
    const id = (idToSearch || bookingIdInput).trim();
    if (!id) {
      setError('Please enter a valid Booking ID.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiService.getAppointmentByBookingId(id);
      setAppointment(response.data);
    } catch (err) {
      setAppointment(null);
      setError(err.message || 'Appointment not found. Please verify your Booking ID.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialBookingId) {
      setBookingIdInput(initialBookingId);
      fetchAppointment(initialBookingId);
    }
  }, [initialBookingId]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAppointment();
  };

  const copyBookingId = () => {
    if (appointment?.bookingId) {
      navigator.clipboard.writeText(appointment.bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Determine stage in timeline
  const getTimelineStage = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'confirmed') return 3;
    if (s === 'waiting') return 2;
    return 1; // pending
  };

  const currentStage = appointment ? getTimelineStage(appointment.status) : 1;

  return (
    <div className="pb-20 space-y-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/30">
            Real-Time Tracking
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Track Your Appointment Status
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Enter your Booking ID to view real-time triage updates, confirmed consultation times, and hospital notes.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search Bar Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Booking ID (e.g. WC-2026-90214)..."
                value={bookingIdInput}
                onChange={(e) => setBookingIdInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-mono uppercase tracking-wider text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm text-white bg-teal-600 hover:bg-teal-700 transition shadow-md shadow-teal-600/25 disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>Track Booking</span>
            </button>
          </form>

          {/* Quick Demo ID chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
            <span className="text-slate-500 font-medium">Try existing test IDs:</span>
            {sampleIds.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setBookingIdInput(id);
                  fetchAppointment(id);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 font-mono text-[11px] font-semibold border border-slate-200 transition"
              >
                {id}
              </button>
            ))}
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* RESULTS CARD */}
        {appointment && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden space-y-8 p-6 sm:p-10 animate-in fade-in duration-300">
            {/* Top Bar with ID and Status */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="text-xs uppercase font-bold text-slate-400">Booking Reference</div>
                <div className="flex items-center gap-2.5 mt-1">
                  <span className="text-2xl font-extrabold font-mono text-slate-900 tracking-wider">
                    {appointment.bookingId}
                  </span>
                  <button
                    onClick={copyBookingId}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-teal-700 hover:bg-slate-100 transition"
                    title="Copy ID"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-1">
                <span className="text-xs uppercase font-bold text-slate-400">Live Status</span>
                <StatusBadge status={appointment.status} />
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="py-2">
              <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full z-0" />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-600 transition-all duration-500 z-0"
                  style={{
                    width: currentStage === 3 ? '100%' : currentStage === 2 ? '50%' : '0%'
                  }}
                />

                {/* Step 1: Pending */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-4 border-white shadow-sm transition ${
                      currentStage >= 1
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    1
                  </div>
                  <span className="text-xs font-bold text-slate-900 mt-2">Received</span>
                  <span className="text-[10px] text-slate-500">Status: Pending</span>
                </div>

                {/* Step 2: Waiting */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-4 border-white shadow-sm transition ${
                      currentStage >= 2
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    2
                  </div>
                  <span className="text-xs font-bold text-slate-900 mt-2">Under Triage</span>
                  <span className="text-[10px] text-slate-500">Status: Waiting</span>
                </div>

                {/* Step 3: Confirmed */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-4 border-white shadow-sm transition ${
                      currentStage >= 3
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    3
                  </div>
                  <span className="text-xs font-bold text-slate-900 mt-2">Confirmed</span>
                  <span className="text-[10px] text-slate-500">Slot Scheduled</span>
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/80 p-6 sm:p-8 rounded-2xl border border-slate-200 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-semibold">Patient Name</span>
                <div className="text-sm font-bold text-slate-900">{appointment.patientName}</div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-semibold">Contact Info</span>
                <div className="text-sm font-medium text-slate-800">
                  {appointment.contact?.phone} {appointment.contact?.email ? `• ${appointment.contact.email}` : ''}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-semibold">Doctor Assigned</span>
                <div className="text-sm font-bold text-teal-800">{appointment.doctorName}</div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-semibold">Department</span>
                <div className="text-sm font-bold text-slate-800">{appointment.departmentName}</div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-semibold">Appointment Date & Time</span>
                <div className="text-sm font-bold text-slate-900">
                  {appointment.appointmentDate} at {appointment.appointmentTime}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 uppercase font-semibold">Stated Reason</span>
                <div className="text-slate-700 font-medium">{appointment.reason || 'General Consultation'}</div>
              </div>
            </div>

            {/* Status explanation notice */}
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-100 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div className="text-xs text-teal-900 leading-relaxed">
                {appointment.status === 'Confirmed' && (
                  <span>
                    <strong>Appointment Confirmed:</strong> Please arrive 15 minutes prior to {appointment.appointmentTime} on {appointment.appointmentDate} at Tower A / Outpatient Reception with your photo ID.
                  </span>
                )}
                {appointment.status === 'Waiting' && (
                  <span>
                    <strong>Under Clinical Review:</strong> The department coordinator is reviewing medical logs and confirming physician availability. You will receive an SMS update shortly.
                  </span>
                )}
                {appointment.status === 'Pending' && (
                  <span>
                    <strong>Request Received:</strong> Your booking is queued in the hospital appointment system and will be reviewed shortly by our admissions desk.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
