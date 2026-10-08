import React from 'react';
import {
  HeartPulse,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function Footer({ setActivePage }) {
  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Pre-footer Emergency Callout */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 border-b border-teal-800/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <Phone className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-rose-400">
                24x7 Emergency Medical Hotline
              </span>
              <h4 className="text-2xl font-bold text-white tracking-tight">
                (800) 427-CARE <span className="text-slate-400 text-lg font-normal">or (800) 427-3273</span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Immediate ambulance dispatch & Level-1 trauma surgical response team ready.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo('ai-assistant')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ask AI Doctor Assistant</span>
            </button>
            <button
              onClick={() => navigateTo('booking')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium text-sm transition shadow-lg shadow-teal-500/25"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                WeCare <span className="text-teal-400">Hospital</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              A premier multi-specialty tertiary care hospital dedicated to providing world-class medical excellence, ethical patient-first care, and cutting-edge healthcare technology.
            </p>
            <div className="pt-2 flex flex-col gap-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>742 Healthway Boulevard, Medical City District, Metro NY 10001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>care@wecarehospital.com | appointment@wecarehospital.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Outpatient Consultations: Mon-Sat 08:00 AM - 08:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Hospital Portal
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-teal-400 transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-teal-400 transition">
                  About WeCare
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('departments')} className="hover:text-teal-400 transition">
                  Medical Departments
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('doctors')} className="hover:text-teal-400 transition">
                  Find a Doctor
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('booking')} className="hover:text-teal-400 transition">
                  Book Appointment
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('track')} className="hover:text-teal-400 transition">
                  Track Your Booking
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('skin-health')} className="hover:text-teal-400 transition flex items-center gap-1.5 text-teal-300 font-semibold">
                  <span>AI Skin Health Assistant</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical Departments */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Departments
            </h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => navigateTo('departments')} className="hover:text-teal-400 transition">
                  Cardiology & Vascular
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('departments')} className="hover:text-teal-400 transition">
                  Neurology & Brain Spine
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('departments')} className="hover:text-teal-400 transition">
                  Orthopedics & Joint Surgery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('departments')} className="hover:text-teal-400 transition">
                  Dermatology & Skin Care
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('departments')} className="hover:text-teal-400 transition">
                  Pediatrics & Child Care
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('departments')} className="hover:text-teal-400 transition">
                  ENT (Ear, Nose & Throat)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('departments')} className="hover:text-teal-400 transition">
                  Gynecology & Maternity
                </button>
              </li>
            </ul>
          </div>

          {/* AI Feature & Trust Accreditations */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              AI & Accreditations
            </h5>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>AI Doctor Recommendation</span>
              </div>
              <p className="text-xs text-slate-400">
                Not sure whom to see? Describe your symptoms to our clinical routing AI assistant.
              </p>
              <button
                onClick={() => navigateTo('ai-assistant')}
                className="w-full py-2 px-3 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-semibold transition border border-teal-500/30 text-center"
              >
                Try AI Assistant →
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>JCI International Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-400" />
                <span>NABH & ISO 9001:2015 Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Medical Safety Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-3">
          <p className="leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/60">
            <span className="font-semibold text-slate-300">MEDICAL DISCLAIMER:</span> The content on this website and recommendations generated by the AI Doctor Assistant are for informational, navigational, and appointment scheduling purposes only. They do not constitute medical diagnosis, doctor-patient relationships, or personalized treatment plans. If you believe you are experiencing a medical emergency (such as severe chest pain, shortness of breath, loss of speech, or uncontrollable bleeding), call 911 / 112 or visit the nearest emergency facility immediately.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 pt-2">
            <div>
              © {new Date().getFullYear()} WeCare Hospital Healthcare System. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => navigateTo('admin')} className="hover:text-teal-400 transition">
                Hospital Staff Portal
              </button>
              <span>Privacy Policy</span>
              <span>Patient Rights & HIPAA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
