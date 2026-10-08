import React from 'react';
import {
  HeartPulse,
  Award,
  ShieldCheck,
  Building2,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Activity,
  Ambulance,
  Stethoscope
} from 'lucide-react';

export default function AboutPage({ setActivePage }) {
  return (
    <div className="pb-20 space-y-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/30">
            About WeCare Hospital
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Setting the Benchmark for Healthcare Excellence
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Founded with a steadfast mission to combine world-class clinical expertise with warmth, empathy, and technological innovation.
          </p>
        </div>
      </section>

      {/* Hospital Overview & Heritage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-600">
              Our Healthcare Journey
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              A Legacy of Healing, Hope & Advanced Clinical Innovation
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              WeCare Hospital was established as a full-spectrum tertiary healthcare destination. Over the years, we have grown into an internationally acclaimed medical center spanning 450 inpatient beds, 16 state-of-the-art modular operating theaters, and 9 dedicated clinical institutes.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether responding to acute cardiac crises in our 24/7 catheterization lab or counseling parents in pediatric care, our medical teams adhere to the highest standards of evidence-based clinical protocols.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100">
                <div className="text-2xl font-bold text-teal-800">450+</div>
                <div className="text-xs text-slate-600 font-medium">Inpatient Critical Care Beds</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-bold text-slate-900">16</div>
                <div className="text-xs text-slate-600 font-medium">Modular Robotic OT Suites</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80"
                alt="WeCare Hospital Doctors in Consultation"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs font-bold uppercase text-teal-300">Physician Led Leadership</div>
                <div className="text-lg font-bold">Collaborative Multi-disciplinary Clinical Rounds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Philosophy */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To deliver accessible, high-precision, patient-centered healthcare through exceptional clinical expertise, advanced diagnostic technologies, and unwavering compassion for all individuals.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To be the most trusted global healthcare institution known for pioneering clinical research, surgical outcomes, digital health innovations, and compassionate patient advocacy.
              </p>
            </div>

            {/* Patient Care Philosophy */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Care Philosophy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                "Patient First, Always." Every clinical recommendation is guided by transparency, shared decision-making, patient dignity, and uncompromising clinical safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Healthcare Facilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-wider text-teal-600">
            Infrastructure & Technology
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            State-of-the-Art Medical Facilities
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Engineered to empower physicians and accelerate safe, rapid patient recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="text-teal-600 font-bold text-sm flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              <span>Digital Cardiac Cath Lab</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipped with 3D rotational angiography for zero-delay coronary stenting, structural heart valve replacements, and pacemaker implantations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="text-cyan-600 font-bold text-sm flex items-center gap-2">
              <Activity className="w-5 h-5" />
              <span>3-Tesla Silent Scan MRI</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ultra-high-definition neuro, musculoskeletal, and cardiac magnetic resonance imaging with claustrophobia-reducing wide bore design.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="text-emerald-600 font-bold text-sm flex items-center gap-2">
              <Ambulance className="w-5 h-5" />
              <span>Level-1 Trauma & Resuscitation</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct rooftop helipad connectivity, 24/7 dedicated trauma surgeons, critical care intensivists, and emergency blood bank supplies.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="text-amber-600 font-bold text-sm flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Neonatal & Pediatric ICU (NICU)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Level-III advanced neonatal incubators, high-frequency oscillatory ventilators, and 1-on-1 pediatric intensive nursing care.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="text-indigo-600 font-bold text-sm flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              <span>Robotic-Assisted Surgery</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sub-millimeter precision robotic consoles for minimally invasive urological, orthopedic joint replacement, and abdominal operations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="text-rose-600 font-bold text-sm flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>AI Clinical Routing Hub</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our real-time AI Doctor Recommendation Assistant helps patients match with the exact clinical specialist for their complaints.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-700 to-cyan-800 text-white p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Consult with Our Medical Team?</h2>
          <p className="text-teal-100 text-sm max-w-xl mx-auto">
            Schedule your appointment online or explore our department directory.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setActivePage('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white text-teal-800 hover:bg-teal-50 shadow-md transition"
            >
              Book an Appointment
            </button>
            <button
              onClick={() => {
                setActivePage('ai-assistant');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-teal-900/40 hover:bg-teal-900/60 text-white border border-white/20 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Ask AI Doctor Assistant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
