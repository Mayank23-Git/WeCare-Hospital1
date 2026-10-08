import React from 'react';
import {
  HeartPulse,
  Sparkles,
  Calendar,
  Phone,
  ShieldCheck,
  Award,
  Users,
  Activity,
  ArrowRight,
  Clock,
  CheckCircle2,
  Stethoscope,
  Building2,
  Ambulance,
  Star,
  Camera
} from 'lucide-react';
import DepartmentCard from '../components/DepartmentCard.jsx';
import DoctorCard from '../components/DoctorCard.jsx';

export default function HomePage({
  departments,
  doctors,
  setActivePage,
  setSelectedDepartment,
  setSelectedDoctor,
  onOpenDoctorModal
}) {
  const featuredDepartments = departments.slice(0, 6);
  const featuredDoctors = doctors.slice(0, 4);

  const handleBookDoctor = (doc) => {
    setSelectedDoctor(doc);
    setSelectedDepartment(doc.departmentId);
    setActivePage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-slate-50 to-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs font-semibold border border-teal-200">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                <span>Premier Tertiary Healthcare Network • JCI Accredited</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Compassionate Care Meets{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-800">
                  Modern Medicine
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Welcome to <strong className="text-slate-800 font-semibold">WeCare Hospital</strong>. Over 120+ certified specialists across 9 specialized clinical departments, equipped with advanced surgical suites, 24/7 trauma care, and an intelligent AI routing assistant to guide you to the right doctor.
              </p>

              {/* Main CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => {
                    setActivePage('booking');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-xl shadow-teal-600/25 hover:shadow-teal-600/35 transition transform active:scale-95"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book an Appointment</span>
                </button>

                <button
                  onClick={() => {
                    setActivePage('ai-assistant');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-base font-bold text-slate-900 bg-white hover:bg-teal-50/70 border-2 border-teal-200 hover:border-teal-400 shadow-sm transition group"
                >
                  <Sparkles className="w-5 h-5 text-amber-500 group-hover:rotate-12 transition duration-300" />
                  <span>Not Sure Which Doctor? Ask AI</span>
                  <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900">50k+</h4>
                  <p className="text-xs text-slate-500 font-medium">Patients Treated</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-teal-700">120+</h4>
                  <p className="text-xs text-slate-500 font-medium">Specialist Doctors</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900">99.4%</h4>
                  <p className="text-xs text-slate-500 font-medium">Satisfaction Rate</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual & Emergency Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Hero Hospital Imagery */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80"
                    alt="WeCare Hospital Medical Facility"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-xs uppercase font-bold tracking-widest text-teal-300">
                      Center of Medical Excellence
                    </span>
                    <h3 className="text-xl font-bold">24x7 Comprehensive Care Campus</h3>
                    <p className="text-xs text-slate-200 mt-1">
                      Equipped with Level-1 Trauma Suites, Digital Cath Labs & Robotic Surgery.
                    </p>
                  </div>
                </div>

                {/* Floating Emergency Highlight Card */}
                <div className="mt-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <Ambulance className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-rose-600">
                        Emergency & Trauma
                      </div>
                      <div className="text-sm font-bold text-slate-900">(800) 427-CARE</div>
                      <div className="text-[11px] text-slate-500">Ambulance ETA &lt; 10 mins</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActivePage('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 py-2 px-3 rounded-lg transition"
                  >
                    Hospital Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white p-8 sm:p-12 shadow-2xl border border-teal-800/40">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Next-Gen Patient Assistance</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Confused About Symptoms? Let AI Guide You to the Right Specialist.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Instead of guessing between Neurology, ENT, or General Medicine, describe what hurts in natural words. Our AI assistant analyzes clinical keywords, flags potential emergencies, and matches you with available WeCare physicians in seconds.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-300 pt-1">
                <span className="bg-white/10 px-3 py-1 rounded-full">✓ No Medical Jargon Needed</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">✓ Connects to Real Doctors</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">✓ 100% Free & Confidential</span>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => {
                  setActivePage('ai-assistant');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-lg shadow-amber-400/20 transition transform active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-slate-900" />
                <span>Launch AI Doctor Assistant</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Skin Health Assistant Highlight Banner */}
        <div className="mt-6 rounded-3xl bg-gradient-to-r from-cyan-900 via-slate-900 to-teal-950 text-white p-6 sm:p-8 border border-cyan-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full">
                  New Visual Feature
                </span>
                <span className="text-xs text-cyan-300 font-semibold">Gemini Vision AI</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">
                AI Skin Health Assistant
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Take a clear face photo for an AI-based visual skin screening. Screen for visible surface concerns such as redness, blemishes, or dry/oily appearance, with zero permanent photo storage.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setActivePage('skin-health');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-md shadow-cyan-500/25 transition shrink-0 flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span>Open AI Skin Health Assistant</span>
          </button>
        </div>
      </section>

      {/* Departments Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600">
              Clinical Specializations
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Centers of Excellence
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              From advanced interventional cardiology to pediatric medicine, our multi-disciplinary departments deliver holistic care.
            </p>
          </div>
          <button
            onClick={() => {
              setActivePage('departments');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 transition"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDepartments.map((dept) => (
            <DepartmentCard
              key={dept.departmentId}
              department={dept}
              onViewDoctors={handleViewDeptDoctors}
              onBookDepartment={handleBookDept}
            />
          ))}
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600">
              Medical Leadership
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Our Distinguished Doctors
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Board-certified specialists with decades of combined clinical expertise at top academic medical institutions.
            </p>
          </div>
          <button
            onClick={() => {
              setActivePage('doctors');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 transition"
          >
            <span>Explore All 120+ Doctors</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doc) => (
            <DoctorCard
              key={doc.doctorId}
              doctor={doc}
              onBook={handleBookDoctor}
              onViewDetails={onOpenDoctorModal}
            />
          ))}
        </div>
      </section>

      {/* Why Choose WeCare Hospital */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600">
              The WeCare Standard
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Why Patients Choose WeCare Hospital
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Combining world-class clinical expertise, cutting-edge diagnostic infrastructure, and transparent compassionate service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">JCI & NABH Accredited</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stringent global safety protocols and quality metrics matching top international academic healthcare institutions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">24x7 Emergency Trauma</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Round-the-clock emergency room, dedicated cardiothoracic catheterization lab, and specialized neuro-trauma team.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Advanced Diagnostics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equipped with 3-Tesla High-Field MRI, 128-Slice Dual Source CT, digital mammography, and automated molecular biology pathology labs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">AI-Guided Care Routing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Intelligent Doctor Recommendation Assistant assists patients in identifying appropriate medical departments based on real-time symptoms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-wider text-teal-600">
            Real Experiences
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Stories from Our Patients
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every recovery is personal. Hear how our dedicated medical teams impacted real lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "The AI Doctor Assistant pointed me toward Neurology when I was getting recurrent migraines with visual flashes. Dr. Marcus Chen diagnosed my condition accurately and tailored a therapy plan that changed my quality of life."
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs">
                MC
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Michael C.</h4>
                <p className="text-[11px] text-slate-500">Neurology Patient</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "From appointment booking online to hospital check-in, the entire process was seamless. Dr. Arthur Vance in Cardiology explained my catheterization procedure with warmth and reassurance."
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cyan-100 text-cyan-700 font-bold flex items-center justify-center text-xs">
                SA
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Sarah Albright</h4>
                <p className="text-[11px] text-slate-500">Cardiology Patient</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "The Track Booking feature gave me instant clarity on my appointment status. When I arrived, the nursing staff and Dr. Linda Gomez made my 4-year-old feel safe and smiling during his vaccination visit."
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                DK
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">David & Emma K.</h4>
                <p className="text-[11px] text-slate-500">Pediatric Care</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
