import React, { useState } from 'react';
import {
  HeartPulse,
  Phone,
  Clock,
  Sparkles,
  Calendar,
  Search,
  ShieldCheck,
  Menu,
  X,
  Lock,
  Camera
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenAiModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'departments', label: 'Departments' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'booking', label: 'Book Appointment' },
    { id: 'track', label: 'Track Booking' },
    { id: 'ai-assistant', label: 'AI Doctor', isSpecial: true },
    { id: 'skin-health', label: 'AI Skin Health', isSkinSpecial: true },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top Emergency & Info Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-1.5 text-rose-300 font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
              <span>EMERGENCY 24x7: (800) 427-CARE</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>Ambulance Dispatch: Dial 911 / 108</span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>Trauma Centre: Open 24 Hours / 365 Days</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline text-teal-300 font-medium">JCI & NABH Accredited</span>
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                activePage === 'admin'
                  ? 'bg-teal-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200'
              }`}
            >
              <Lock className="w-3 h-3 text-teal-300" />
              Admin Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition duration-200">
              <HeartPulse className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition">
                  WeCare
                </span>
                <span className="text-2xl font-semibold text-teal-600">Hospital</span>
              </div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Advanced Medicine • Compassionate Care
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              if (item.isSpecial) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative ml-1 px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200/80'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>AI Doctor</span>
                  </button>
                );
              }

              if (item.isSkinSpecial) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-cyan-700 text-white shadow-sm'
                        : 'bg-cyan-50 text-cyan-900 hover:bg-cyan-100 border border-cyan-200/80'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5 text-cyan-600" />
                    <span>AI Skin Health</span>
                    <span className="bg-amber-400 text-slate-950 text-[9px] uppercase font-bold px-1.5 py-0.2 rounded-full">
                      New
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'text-teal-700 bg-teal-50/80 font-semibold'
                      : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('booking')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-md shadow-teal-500/20 hover:shadow-teal-500/30 transition transform active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNavClick('ai-assistant')}
              className="p-2 text-teal-700 bg-teal-50 border border-teal-200 rounded-lg"
              title="AI Doctor Assistant"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-teal-600 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium ${
                  activePage === item.id
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.isSpecial && <Sparkles className="w-4 h-4 text-amber-500" />}
                  {item.isSkinSpecial && <Camera className="w-4 h-4 text-cyan-600" />}
                  <span>{item.label}</span>
                </div>
                {item.isSpecial && (
                  <span className="text-[10px] font-bold uppercase bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded-full">
                    AI Guided
                  </span>
                )}
                {item.isSkinSpecial && (
                  <span className="text-[10px] font-bold uppercase bg-cyan-600 text-white px-1.5 py-0.5 rounded-full">
                    Visual AI
                  </span>
                )}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('booking')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                Book an Appointment
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 border border-slate-200"
              >
                <Lock className="w-4 h-4 text-slate-500" />
                Admin Dashboard Login
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
