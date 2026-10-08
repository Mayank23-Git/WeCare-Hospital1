import React, { useState } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  Calendar,
  Star,
  Award,
  Clock,
  CheckCircle2,
  Users
} from 'lucide-react';
import DoctorCard from '../components/DoctorCard.jsx';

export default function DoctorsPage({
  doctors,
  departments,
  selectedDepartment,
  setSelectedDepartment,
  setSelectedDoctor,
  setActivePage,
  onOpenDoctorModal
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = doctors.filter((doc) => {
    const matchesDept =
      !selectedDepartment ||
      selectedDepartment === 'all' ||
      doc.departmentId.toLowerCase() === selectedDepartment.toLowerCase();

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      doc.name.toLowerCase().includes(q) ||
      doc.specialization.toLowerCase().includes(q) ||
      doc.department.toLowerCase().includes(q) ||
      doc.doctorId.toLowerCase().includes(q);

    return matchesDept && matchesSearch;
  });

  const handleBook = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDepartment(doctor.departmentId);
    setActivePage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-20 space-y-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/30">
            Medical Faculty & Consultants
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Find Your Specialist Doctor
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Search our directory of certified consultants, surgeons, and physicians. Book a consultation or learn more about their credentials.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by doctor name, specialty, condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 placeholder:text-slate-300 focus:placeholder:text-slate-400 border border-white/20 focus:border-teal-400 outline-none transition text-sm shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Department Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedDepartment('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              !selectedDepartment || selectedDepartment === 'all'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Departments ({doctors.length})
          </button>

          {departments.map((dept) => {
            const count = doctors.filter((d) => d.departmentId === dept.departmentId).length;
            const isSelected = selectedDepartment?.toLowerCase() === dept.departmentId.toLowerCase();
            return (
              <button
                key={dept.departmentId}
                onClick={() => setSelectedDepartment(dept.departmentId)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{dept.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Counter & Assistant Tip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-teal-50/60 p-4 rounded-2xl border border-teal-100">
          <div className="text-xs text-slate-700 font-medium">
            Showing <strong className="text-teal-900 font-bold">{filteredDoctors.length}</strong> available doctors
            {selectedDepartment && selectedDepartment !== 'all' && (
              <span> in <span className="capitalize font-bold text-teal-800">{selectedDepartment.replace('-', ' ')}</span></span>
            )}
          </div>

          <button
            onClick={() => {
              setActivePage('ai-assistant');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-white px-3 py-1.5 rounded-lg border border-teal-200 shadow-2xs hover:bg-teal-50 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Not sure whom to pick? Ask AI Doctor Assistant</span>
          </button>
        </div>

        {/* Doctor Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
            <Users className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No doctors found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any doctors matching your search criteria. Try clearing filters or searching for another symptom.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDepartment('all');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <DoctorCard
                key={doc.doctorId}
                doctor={doc}
                onBook={handleBook}
                onViewDetails={onOpenDoctorModal}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
