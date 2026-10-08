import React from 'react';
import {
  Calendar,
  Clock,
  Award,
  Star,
  CheckCircle2,
  ArrowRight,
  Info
} from 'lucide-react';

export default function DoctorCard({ doctor, onBook, onViewDetails }) {
  if (!doctor) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-teal-300">
      {/* Top Banner / Image Area */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={doctor.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80"}
              alt={doctor.name}
              className="w-20 h-20 rounded-2xl object-cover object-top border-2 border-white shadow-md group-hover:scale-105 transition duration-300"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80";
              }}
            />
            <span className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-xs" title="Verified Specialist">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-100">
                {doctor.department}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{doctor.rating || '4.9'}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mt-1 truncate group-hover:text-teal-700 transition">
              {doctor.name}
            </h3>

            <p className="text-xs font-medium text-slate-600 line-clamp-1 mt-0.5">
              {doctor.specialization}
            </p>

            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-teal-600" />
                <span>{doctor.experience} Exp</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-slate-700">
                ${doctor.consultationFee || 75} Fee
              </span>
            </div>
          </div>
        </div>

        {/* Bio excerpt */}
        <p className="text-xs text-slate-500 mt-4 line-clamp-2 leading-relaxed bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
          {doctor.biography}
        </p>

        {/* Availability */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 font-medium">
          <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span className="truncate">{doctor.availability}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewDetails && onViewDetails(doctor)}
          className="text-xs font-semibold text-slate-600 hover:text-teal-700 flex items-center gap-1 py-2 px-2.5 rounded-lg hover:bg-white transition"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Profile</span>
        </button>

        <button
          onClick={() => onBook && onBook(doctor)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-500/20 hover:shadow-teal-500/30 transition transform active:scale-95"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Appointment</span>
        </button>
      </div>
    </div>
  );
}
