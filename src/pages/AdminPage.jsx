import React, { useState, useEffect } from 'react';
import {
  Lock,
  User,
  Key,
  LogOut,
  Calendar,
  Clock,
  Phone,
  Mail,
  Search,
  Filter,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Users,
  Database
} from 'lucide-react';
import { apiService } from '../services/api.js';
import StatusBadge from '../components/StatusBadge.jsx';

export default function AdminPage({ setActivePage }) {
  const [token, setToken] = useState(() => localStorage.getItem('wecare_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wecare_admin_user') || 'null');
    } catch {
      return null;
    }
  });

  // Login form state
  const [identifier, setIdentifier] = useState('admin');
  const [password, setPassword] = useState('wecareAdmin2026!');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard state
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [actionMessage, setActionMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const response = await apiService.adminLogin(identifier, password);
      const authToken = response.token;
      setToken(authToken);
      setAdminUser(response.admin);
      localStorage.setItem('wecare_admin_token', authToken);
      localStorage.setItem('wecare_admin_user', JSON.stringify(response.admin));
    } catch (err) {
      setLoginError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setAdminUser(null);
    localStorage.removeItem('wecare_admin_token');
    localStorage.removeItem('wecare_admin_user');
  };

  const loadDashboardData = async () => {
    if (!token) return;
    setLoadingData(true);
    setActionMessage('');

    try {
      const [apptsRes, statsRes] = await Promise.all([
        apiService.getAdminAppointments(statusFilter, searchQuery, token),
        apiService.getAdminStats(token)
      ]);
      setAppointments(apptsRes.data || []);
      setStats(statsRes.data || null);
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
      if (err.message?.includes('expired') || err.message?.includes('denied')) {
        handleLogout();
      }
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token, statusFilter]);

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    setActionMessage('');

    try {
      await apiService.updateAppointmentStatus(id, newStatus, token);
      setActionMessage(`Appointment successfully set to "${newStatus}"`);
      // Refresh list and stats
      await loadDashboardData();
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      alert(`Error updating appointment: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // If not logged in, show Login Screen
  if (!token) {
    return (
      <div className="pb-24 pt-12 max-w-md mx-auto px-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto border border-teal-100 shadow-xs">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Hospital Staff Portal
            </h1>
            <p className="text-xs text-slate-500">
              Administrative access to manage clinical bookings and triage queues.
            </p>
          </div>

          {/* Quick Demo Credentials Info */}
          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs text-teal-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Default Testing Credentials</span>
            </div>
            <div className="text-[11px] text-teal-800">
              Username: <code className="font-mono font-bold bg-teal-100 px-1 py-0.5 rounded">admin</code> |
              Password: <code className="font-mono font-bold bg-teal-100 px-1 py-0.5 rounded">wecareAdmin2026!</code>
            </div>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Username or Email</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-teal-600 hover:bg-teal-700 transition shadow-md shadow-teal-600/25 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Secure Staff Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // LOGGED IN ADMIN DASHBOARD
  return (
    <div className="pb-24 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Authenticated Hospital Administrator</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Appointment Management Console
          </h1>
          <p className="text-xs text-slate-500">
            Logged in as {adminUser?.username || 'admin'} ({adminUser?.email || 'admin@wecarehospital.com'})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboardData}
            disabled={loadingData}
            className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin text-teal-600' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* KPI Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Bookings
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{stats.total}</div>
            <div className="text-[11px] text-slate-400">All recorded appointments</div>
          </div>

          <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 shadow-2xs space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Pending Queue
            </div>
            <div className="text-3xl font-extrabold text-sky-800">{stats.pending}</div>
            <div className="text-[11px] text-sky-600">Awaiting clinical triage</div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-100 shadow-2xs space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Under Review (Waiting)
            </div>
            <div className="text-3xl font-extrabold text-amber-800">{stats.waiting}</div>
            <div className="text-[11px] text-amber-600">Coordinating physician slot</div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 shadow-2xs space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Confirmed
            </div>
            <div className="text-3xl font-extrabold text-emerald-800">{stats.confirmed}</div>
            <div className="text-[11px] text-emerald-600">Ready for consultation</div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'Pending', 'Waiting', 'Confirmed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-teal-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, ID, doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadDashboardData()}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-100 outline-none"
          />
        </div>
      </div>

      {/* Appointments Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-6">Booking ID</th>
                <th className="py-4 px-6">Patient & Contact</th>
                <th className="py-4 px-6">Doctor & Dept</th>
                <th className="py-4 px-6">Schedule</th>
                <th className="py-4 px-6">Reason</th>
                <th className="py-4 px-6">Current Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No appointments found matching current filter.
                  </td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt._id || appt.bookingId} className="hover:bg-slate-50/80 transition">
                    {/* Booking ID */}
                    <td className="py-4 px-6 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {appt.bookingId}
                    </td>

                    {/* Patient & Contact */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{appt.patientName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span>{appt.contact?.phone}</span>
                        {appt.contact?.email && (
                          <>
                            <span>•</span>
                            <span className="truncate max-w-[120px]">{appt.contact.email}</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Doctor & Department */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-teal-800">{appt.doctorName}</div>
                      <div className="text-[11px] text-slate-500">{appt.departmentName}</div>
                    </td>

                    {/* Schedule */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="font-medium text-slate-800">{appt.appointmentDate}</div>
                      <div className="text-[11px] text-slate-500">{appt.appointmentTime}</div>
                    </td>

                    {/* Reason */}
                    <td className="py-4 px-6 max-w-xs">
                      <p className="line-clamp-2 text-slate-600" title={appt.reason}>
                        {appt.reason || 'General Consultation'}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <StatusBadge status={appt.status} />
                    </td>

                    {/* Actions: Confirm & Waiting */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Confirm Button */}
                        <button
                          onClick={() => handleUpdateStatus(appt._id || appt.bookingId, 'Confirmed')}
                          disabled={updatingId === (appt._id || appt.bookingId) || appt.status === 'Confirmed'}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            appt.status === 'Confirmed'
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                        >
                          Confirm
                        </button>

                        {/* Waiting Button */}
                        <button
                          onClick={() => handleUpdateStatus(appt._id || appt.bookingId, 'Waiting')}
                          disabled={updatingId === (appt._id || appt.bookingId) || appt.status === 'Waiting'}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            appt.status === 'Waiting'
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                          }`}
                        >
                          Waiting
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
