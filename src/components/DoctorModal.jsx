import React from 'react';
import {
  X,
  Star,
  Award,
  Clock,
  Calendar,
  CheckCircle2,
  GraduationCap,
  DollarSign,
  HeartPulse
} from 'lucide-react';

export default function DoctorModal({ doctor, onClose, onBook }) {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-teal-800 to-slate-900 text-white p-6 sm:p-8 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <img
              src={doctor.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80"}
              alt={doctor.name}
              className="w-24 h-24 sm:w-28 sm:sm-28 rounded-2xl object-cover object-top border-4 border-white/20 shadow-lg"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80";
              }}
            />

            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/30 text-teal-200 border border-teal-400/30 mb-2">
                {doctor.department} Specialist
              </span>
              <h2 className="text-2xl font-bold">{doctor.name}</h2>
              <p className="text-teal-200 text-sm font-medium mt-1">
                {doctor.specialization}
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-200">
                <span className="flex items-center gap-1 font-semibold text-amber-300">
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                  {doctor.rating} Rating
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-teal-300" />
                  {doctor.experience} Experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Qualifications & Fee Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900">
                  Qualifications
                </h4>
                <p className="text-xs text-slate-700 mt-1 font-medium leading-relaxed">
                  {doctor.qualifications || "Board Certified Specialist in Clinical Healthcare"}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Clock className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Clinical Hours
                </h4>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {doctor.availability}
                </p>
                <p className="text-xs text-teal-700 font-bold mt-1">
                  Consultation Fee: ${doctor.consultationFee || 75}
                </p>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Clinical Background & Biography
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {doctor.biography}
            </p>
          </div>

          {/* Practice Focus & Ethics */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Practice Highlights
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Evidence-based clinical guidelines</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Minimally invasive diagnostic approach</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Personalized patient counseling</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Post-consultation follow-up support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 rounded-b-3xl flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              if (onBook) onBook(doctor);
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-500/20 transition"
          >
            <Calendar className="w-4 h-4" />
            <span>Book with {doctor.name.split(',')[0]}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
