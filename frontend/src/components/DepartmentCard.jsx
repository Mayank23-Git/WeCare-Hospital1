import React from 'react';
import {
  HeartPulse,
  Brain,
  Activity,
  Baby,
  Ear,
  Stethoscope,
  Users,
  Smile,
  Sparkles,
  ArrowRight,
  MapPin,
  UserCheck,
  ShieldAlert
} from 'lucide-react';

const iconMap = {
  HeartPulse: HeartPulse,
  Brain: Brain,
  Activity: Activity,
  Baby: Baby,
  Ear: Ear,
  Stethoscope: Stethoscope,
  Users: Users,
  Smile: Smile,
  Sparkles: Sparkles
};

export default function DepartmentCard({ department, onViewDoctors, onBookDepartment }) {
  if (!department) return null;

  const IconComponent = iconMap[department.icon] || Activity;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-teal-300">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 group-hover:bg-teal-600 text-teal-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
            <IconComponent className="w-7 h-7" />
          </div>
          {department.emergencyAvailable && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              <ShieldAlert className="w-3 h-3" />
              24/7 Emergency
            </span>
          )}
        </div>

        {/* Title & Specialization */}
        <h3 className="text-xl font-bold text-slate-900 mt-5 group-hover:text-teal-700 transition">
          {department.name}
        </h3>
        <p className="text-xs font-semibold text-teal-600 mt-1">
          {department.specialization}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-500 mt-3 leading-relaxed">
          {department.description}
        </p>

        {/* Location & HOD */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
          {department.headOfDepartment && (
            <div className="flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="truncate">HOD: {department.headOfDepartment}</span>
            </div>
          )}
          {department.roomLocation && (
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{department.roomLocation}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewDoctors && onViewDoctors(department)}
          className="text-xs font-semibold text-slate-700 hover:text-teal-700 py-2 px-3 rounded-lg hover:bg-slate-50 transition flex items-center gap-1"
        >
          <span>View Doctors</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onBookDepartment && onBookDepartment(department)}
          className="text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 py-2 px-3.5 rounded-xl border border-teal-200/80 transition"
        >
          Book in Dept
        </button>
      </div>
    </div>
  );
}
