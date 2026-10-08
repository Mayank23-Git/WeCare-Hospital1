import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import DoctorModal from './components/DoctorModal.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import DepartmentsPage from './pages/DepartmentsPage.jsx';
import DoctorsPage from './pages/DoctorsPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import TrackBookingPage from './pages/TrackBookingPage.jsx';
import AiAssistantPage from './pages/AiAssistantPage.jsx';
import SkinHealthPage from './pages/SkinHealthPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { apiService } from './services/api.js';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [departments, setDepartments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Cross-page selection states
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [trackBookingId, setTrackBookingId] = useState('');

  // Doctor modal popup state
  const [activeModalDoctor, setActiveModalDoctor] = useState<any>(null);

  // Fetch initial hospital catalog data
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [deptRes, docRes] = await Promise.all([
          apiService.getDepartments(),
          apiService.getDoctors()
        ]);
        setDepartments(deptRes.data || []);
        setDoctors(docRes.data || []);
      } catch (err) {
        console.error('Initial data fetch error:', err);
        setGlobalError('Failed to initialize hospital data catalog. Please refresh.');
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  const handleBookFromDoctorModal = (doctor: any) => {
    setActiveModalDoctor(null);
    setSelectedDoctor(doctor);
    setSelectedDepartment(doctor.departmentId);
    setActivePage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenAiModal={() => setActivePage('ai-assistant')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {loading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-teal-600/30 border-t-teal-600 rounded-full animate-spin" />
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-800">
              Loading WeCare Clinical Network...
            </p>
          </div>
        ) : (
          <>
            {activePage === 'home' && (
              <HomePage
                departments={departments}
                doctors={doctors}
                setActivePage={setActivePage}
                setSelectedDepartment={setSelectedDepartment}
                setSelectedDoctor={setSelectedDoctor}
                onOpenDoctorModal={(doc: any) => setActiveModalDoctor(doc)}
              />
            )}

            {activePage === 'about' && (
              <AboutPage setActivePage={setActivePage} />
            )}

            {activePage === 'departments' && (
              <DepartmentsPage
                departments={departments}
                doctors={doctors}
                setActivePage={setActivePage}
                setSelectedDepartment={setSelectedDepartment}
                setSelectedDoctor={setSelectedDoctor}
                onOpenDoctorModal={(doc: any) => setActiveModalDoctor(doc)}
              />
            )}

            {activePage === 'doctors' && (
              <DoctorsPage
                doctors={doctors}
                departments={departments}
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
                setSelectedDoctor={setSelectedDoctor}
                setActivePage={setActivePage}
                onOpenDoctorModal={(doc: any) => setActiveModalDoctor(doc)}
              />
            )}

            {activePage === 'booking' && (
              <BookingPage
                departments={departments}
                doctors={doctors}
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
                selectedDoctor={selectedDoctor}
                setSelectedDoctor={setSelectedDoctor}
                setActivePage={setActivePage}
                setTrackBookingId={setTrackBookingId}
              />
            )}

            {activePage === 'track' && (
              <TrackBookingPage
                initialBookingId={trackBookingId}
                setActivePage={setActivePage}
              />
            )}

            {activePage === 'ai-assistant' && (
              <AiAssistantPage
                setActivePage={setActivePage}
                setSelectedDepartment={setSelectedDepartment}
                setSelectedDoctor={setSelectedDoctor}
                onOpenDoctorModal={(doc: any) => setActiveModalDoctor(doc)}
              />
            )}

            {activePage === 'skin-health' && (
              <SkinHealthPage
                setActivePage={setActivePage}
                setSelectedDepartment={setSelectedDepartment}
                setSelectedDoctor={setSelectedDoctor}
                onOpenDoctorModal={(doc: any) => setActiveModalDoctor(doc)}
                departments={departments}
                doctors={doctors}
              />
            )}

            {activePage === 'admin' && (
              <AdminPage setActivePage={setActivePage} />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Doctor Details Modal Dialog */}
      {activeModalDoctor && (
        <DoctorModal
          doctor={activeModalDoctor}
          onClose={() => setActiveModalDoctor(null)}
          onBook={handleBookFromDoctorModal}
        />
      )}
    </div>
  );
}
