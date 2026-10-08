import React, { useState } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  UserCheck,
  MapPin,
  Calendar,
  ShieldAlert
} from 'lucide-react';
import DepartmentCard from '../components/DepartmentCard.jsx';

export default function DepartmentsPage({
  departments,
  doctors,
  setActivePage,
  setSelectedDepartment,
  setSelectedDoctor,
  onOpenDoctorModal
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDepartments = departments.filter((dept) => {
    const q = searchQuery.toLowerCase();
    return (
      dept.name.toLowerCase().includes(q) ||
      dept.specialization.toLowerCase().includes(q) ||
      dept.description.toLowerCase().includes(q)
    );
  });

  const handleViewDeptDoctors = (dept) => {
    setSelectedDepartment(dept.departmentId);
    setActivePage('doctors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookDept = (dept) => {
    setSelectedDepartment(dept.departmentId);
    setSelectedDoctor(null);
    setActivePage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-20 space-y-12">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/30">
            Specialized Care Centers
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Medical Departments & Specialty Clinics
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explore our specialized clinical departments, each led by renowned senior department chairs and equipped with advanced diagnostic suites.
          </p>

          {/* Quick Search */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search departments (e.g. Cardiology, Skin, Joint Pain, Child Care)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 placeholder:text-slate-300 focus:placeholder:text-slate-400 border border-white/20 focus:border-teal-400 outline-none transition text-sm shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Showing {filteredDepartments.length} Departments
            </h2>
            <p className="text-xs text-slate-500">
              Select a department to view specialists or schedule a consultation.
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('ai-assistant');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 transition"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Unsure? Ask AI Assistant</span>
          </button>
        </div>

        {filteredDepartments.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <p className="text-sm font-semibold text-slate-700">No departments found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white"
            >
              Clear Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((dept) => {
              const deptDoctors = doctors.filter((doc) => doc.departmentId === dept.departmentId);
              return (
                <div key={dept.departmentId} className="flex flex-col">
                  <DepartmentCard
                    department={dept}
                    onViewDoctors={handleViewDeptDoctors}
                    onBookDepartment={handleBookDept}
                  />

                  {/* Doctor Mini Preview Pill */}
                  <div className="mt-2 bg-slate-50/80 px-4 py-2.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between text-slate-600">
                    <span>
                      <strong className="text-teal-700 font-semibold">{deptDoctors.length} Specialists</strong> available
                    </span>
                    <button
                      onClick={() => handleViewDeptDoctors(dept)}
                      className="text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1"
                    >
                      <span>Meet Doctors</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
