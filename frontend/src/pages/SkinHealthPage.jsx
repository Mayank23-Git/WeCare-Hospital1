import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Camera,
  Upload,
  ShieldCheck,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  ArrowRight,
  Info,
  X,
  FlipHorizontal,
  Lock,
  Eye,
  Stethoscope
} from 'lucide-react';
import { apiService } from '../services/api.js';

export default function SkinHealthPage({
  setActivePage,
  setSelectedDepartment,
  setSelectedDoctor,
  onOpenDoctorModal,
  departments,
  doctors
}) {
  const [imageSrc, setImageSrc] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [facingMode, setFacingMode] = useState('user'); // 'user' or 'environment'

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [analysisError, setAnalysisError] = useState('');
  const [invalidFaceData, setInvalidFaceData] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Filter existing Dermatology doctors
  const dermatologyDoctors = doctors.filter(
    (d) => d.departmentId?.toLowerCase() === 'dermatology'
  );

  // Stop camera helper
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Request and start camera stream
  const startCamera = async (mode = facingMode) => {
    setCameraError('');
    setAnalysisError('');
    setInvalidFaceData(null);

    // Stop existing stream if any
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Your browser does not support camera access. Please use the file upload option.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      setIsCameraActive(true);

      // Attach stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch((err) => console.error('Video play error:', err));
      }
    } catch (err) {
      console.error('Camera access error:', err);
      let msg = 'Unable to access the camera.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = 'Camera permission was denied. Please allow camera access in your browser settings, or use the file upload option below.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        msg = 'No camera device was detected on your system. Please upload a photo instead.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        msg = 'Camera is currently in use by another application. Please close other camera apps and try again.';
      }
      setCameraError(msg);
      setIsCameraActive(false);
    }
  };

  // Re-attach stream when videoRef becomes available after render
  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [isCameraActive]);

  // Flip camera between front and back
  const toggleFacingMode = () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Capture frame from active video stream
  const capturePhoto = () => {
    if (!videoRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext('2d');
      if (facingMode === 'user') {
        // Mirror front camera capture to match preview
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setImageSrc(dataUrl);
      stopCamera();
      setResult(null);
      setAnalysisError('');
      setInvalidFaceData(null);
    } catch (err) {
      console.error('Capture error:', err);
      setCameraError('Failed to capture frame from camera.');
    }
  };

  // Handle image upload from file system
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setCameraError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setCameraError('Image size exceeds 12MB limit. Please choose a smaller photo.');
      return;
    }

    stopCamera();
    setCameraError('');
    setAnalysisError('');
    setInvalidFaceData(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result);
    };
    reader.readAsDataURL(file);
  };

  // Retake or discard photo
  const handleRetake = () => {
    setImageSrc(null);
    setResult(null);
    setAnalysisError('');
    setInvalidFaceData(null);
    setCameraError('');
  };

  // Submit image to backend for analysis
  const handleAnalyze = async () => {
    if (!imageSrc) return;

    setAnalyzing(true);
    setAnalysisError('');
    setInvalidFaceData(null);
    setResult(null);

    try {
      const response = await apiService.analyzeSkinHealth(imageSrc, 'image/jpeg');
      setResult(response.data);
    } catch (err) {
      console.error('Analysis error:', err);
      if (err.isInvalidFace) {
        setInvalidFaceData({
          errorCode: err.errorCode,
          message: err.message,
          dermatologyDoctors: err.dermatologyDoctors
        });
      } else {
        setAnalysisError(
          err.message || 'The skin health screening encountered an error. Please try again or consult a dermatologist directly.'
        );
      }
    } finally {
      setAnalyzing(false);
    }
  };

  // Consult Dermatologist action
  const handleConsultDermatologist = (doctor = null) => {
    setSelectedDepartment('dermatology');
    if (doctor) {
      setSelectedDoctor(doctor);
    } else if (dermatologyDoctors.length > 0) {
      setSelectedDoctor(dermatologyDoctors[0]);
    }
    setActivePage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrowseDermatologists = () => {
    setSelectedDepartment('dermatology');
    setActivePage('doctors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-24 space-y-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Skin Health Assistant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Visual Skin Health Screening
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Take a clear face photo for an AI-based visual skin screening. We assess visible, general surface skin features and provide gentle skincare care guidance with direct dermatologist consultation options.
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-300 pt-2">
            <span className="bg-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Privacy-First (No Face Biometrics Stored)
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              General Surface Screening Only
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-amber-400" />
              Backed by WeCare Dermatologists
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Step-by-Step Instruction & Privacy Notice */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                How It Works: 3 Simple Steps
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                1. Ensure good, even lighting on your face. Avoid harsh shadows or sunglasses.<br />
                2. Take a photo using your device camera or upload a clear front-facing portrait.<br />
                3. Receive a preliminary screening report with general care guidance and specialist consultation links.
              </p>
            </div>
          </div>

          {/* Explicit Privacy Banner */}
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 space-y-2 text-xs text-teal-950">
            <div className="flex items-center gap-2 font-bold text-teal-900">
              <Lock className="w-4 h-4 text-teal-700 shrink-0" />
              <span>Your Privacy & Biometric Protection Notice</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-teal-800 pt-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Image is used strictly for this requested visual screening.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Photos are NOT permanently saved to MongoDB by default.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>We do NOT extract or store facial biometric embeddings.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Your photo is never published, indexed, or shared publicly.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Capture / Upload Interface Area */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Top Control Bar */}
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Face Photo Capture & Upload
              </h3>
              <p className="text-xs text-slate-500">
                Take a clear face photo for an AI-based visual skin screening.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!isCameraActive && !imageSrc && (
                <>
                  <button
                    onClick={() => startCamera('user')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Open Camera</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Photo</span>
                  </button>
                </>
              )}

              {isCameraActive && (
                <>
                  <button
                    onClick={toggleFacingMode}
                    className="p-2.5 rounded-xl text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition text-xs font-semibold flex items-center gap-1.5"
                    title="Flip camera"
                  >
                    <FlipHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline">Flip</span>
                  </button>
                  <button
                    onClick={stopCamera}
                    className="p-2.5 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition text-xs font-semibold flex items-center gap-1.5"
                  >
                    <X className="w-4 h-4" />
                    <span>Close Camera</span>
                  </button>
                </>
              )}

              {imageSrc && !analyzing && (
                <button
                  onClick={handleRetake}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake / Choose Another</span>
                </button>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Camera Error Message */}
          {cameraError && (
            <div className="m-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{cameraError}</span>
                <div className="mt-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-teal-800 underline hover:text-teal-950"
                  >
                    Click here to upload an image file instead →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Viewport Box (Video stream OR Captured Image OR Placeholder) */}
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center">
            {/* 1. Live Camera Stream */}
            {isCameraActive && (
              <div className="w-full max-w-lg space-y-4 flex flex-col items-center">
                <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border-4 border-teal-500/40">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${
                      facingMode === 'user' ? 'scale-x-[-1]' : ''
                    }`}
                  />

                  {/* Face Alignment Oval Guide */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-52 h-72 rounded-[50%] border-2 border-dashed border-white/70 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-end justify-center pb-4">
                      <span className="text-[11px] font-bold text-white bg-slate-950/70 px-3 py-1 rounded-full backdrop-blur-xs">
                        Center Face Here
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span>Live Preview</span>
                  </div>
                </div>

                <button
                  onClick={capturePhoto}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-xl shadow-teal-600/30 transition transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Capture Photo Now</span>
                </button>
              </div>
            )}

            {/* 2. Captured or Selected Image Preview */}
            {!isCameraActive && imageSrc && (
              <div className="w-full max-w-lg space-y-6 flex flex-col items-center animate-in fade-in duration-300">
                <div className="relative w-full aspect-4/3 max-h-96 rounded-3xl overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-lg">
                  <img
                    src={imageSrc}
                    alt="Captured face for skin screening"
                    className="w-full h-full object-cover"
                  />

                  {/* Scanning Animation while analyzing */}
                  {analyzing && (
                    <div className="absolute inset-0 bg-teal-950/40 backdrop-blur-2xs flex flex-col items-center justify-center text-white p-6 text-center space-y-3">
                      <div className="relative w-16 h-16">
                        <div className="w-16 h-16 border-4 border-teal-400/30 border-t-teal-400 rounded-full animate-spin" />
                        <Sparkles className="w-7 h-7 text-amber-300 absolute inset-0 m-auto animate-pulse" />
                      </div>
                      <div className="font-extrabold text-lg text-white">Analyzing image...</div>
                      <p className="text-xs text-teal-200 max-w-xs leading-relaxed">
                        Examining surface skin appearance and formulating general care guidance.
                      </p>
                    </div>
                  )}
                </div>

                {/* Primary Action Button */}
                {!result && !analyzing && (
                  <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                    <button
                      onClick={handleAnalyze}
                      className="px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-xl shadow-teal-600/30 transition transform active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-5 h-5 text-amber-300" />
                      <span>Start AI Skin Screening</span>
                    </button>

                    <button
                      onClick={handleRetake}
                      className="px-6 py-4 rounded-2xl font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                    >
                      Retake
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 3. Empty State (No Camera, No Image) */}
            {!isCameraActive && !imageSrc && (
              <div className="py-12 px-4 text-center max-w-md space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-100 shadow-xs">
                  <Camera className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Ready for Visual Skin Screening
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                    Open your device camera or upload a well-lit photo to check for visible skin concerns such as redness, blemishes, or dry/oily appearance.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => startCamera('user')}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-600/25 transition flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Open Camera</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Photo</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quality / Invalid Face Error Notice */}
        {invalidFaceData && (
          <div className="bg-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-300 shadow-sm space-y-4 animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-amber-950">
                  Image Could Not Be Reliably Assessed
                </h3>
                <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                  {invalidFaceData.message}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={handleRetake}
                    className="px-4 py-2 rounded-xl font-bold bg-amber-600 text-white hover:bg-amber-700 transition"
                  >
                    Retake with Better Lighting
                  </button>
                  <button
                    onClick={() => handleConsultDermatologist()}
                    className="px-4 py-2 rounded-xl font-bold bg-white text-teal-800 border border-teal-200 hover:bg-teal-50 transition"
                  >
                    Consult a Dermatologist Directly
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* General Analysis Error Notice */}
        {analysisError && (
          <div className="bg-rose-50 rounded-3xl p-6 border border-rose-200 text-rose-900 text-xs sm:text-sm font-semibold flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span>{analysisError}</span>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleAnalyze}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold"
                >
                  Retry Analysis
                </button>
                <button
                  onClick={() => handleConsultDermatologist()}
                  className="px-3.5 py-1.5 rounded-lg bg-white text-slate-800 border border-slate-300 text-xs font-bold"
                >
                  Consult Dermatologist
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS REPORT CARD */}
        {result && (
          <div className="bg-white rounded-3xl border border-teal-200 shadow-2xl p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Screening Complete</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Skin Screening Result
                </h2>
                <p className="text-xs text-slate-500">
                  Preliminary visual observations based on your photo.
                </p>
              </div>

              <button
                onClick={handleRetake}
                className="text-xs font-semibold text-slate-600 hover:text-teal-700 flex items-center gap-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Screen Another Photo</span>
              </button>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {result.summary}
            </div>

            {/* Possible Visible Concerns */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Eye className="w-4 h-4 text-teal-600" />
                <span>Possible Visible Concerns</span>
              </h3>

              {result.visibleConcerns && result.visibleConcerns.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.visibleConcerns.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900">
                          {item.concern}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 shrink-0">
                          {item.severity || 'Noted'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                  No pronounced surface blemishes or localized redness were clearly noted in this photo.
                </div>
              )}
            </div>

            {/* General Care Guidance */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>General Care Guidance</span>
              </h3>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
                {result.generalCareGuidance && result.generalCareGuidance.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidence / Assessment Reliability */}
            <div className="space-y-1 pt-2">
              <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                Confidence & Reliability Note
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                {result.assessmentReliability}
              </p>
            </div>

            {/* Medical Disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Medical Safety Disclaimer</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800">
                {result.disclaimer ||
                  "This AI screening is for general informational purposes only and is not a medical diagnosis or prescription. Always consult a board-certified dermatologist for clinical evaluation."}
              </p>
            </div>

            {/* DERMATOLOGIST CONSULTATION CTA SECTION */}
            <div className="pt-6 border-t border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-bold text-teal-700 tracking-wider">
                    Next Step Recommended
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                    Consult a WeCare Dermatologist
                  </h3>
                  <p className="text-xs text-slate-500">
                    Get an individualized medical evaluation and treatment plan from our hospital skin specialists.
                  </p>
                </div>

                <button
                  onClick={() => handleConsultDermatologist()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-md shadow-teal-600/25 transition shrink-0"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Consult a Dermatologist</span>
                </button>
              </div>

              {/* Show matching dermatology doctors from database */}
              {dermatologyDoctors.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {dermatologyDoctors.map((doc) => (
                    <div
                      key={doc.doctorId}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-teal-300 bg-slate-50/60 hover:bg-white transition flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={doc.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80"}
                          alt={doc.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white shadow-2xs"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {doc.name}
                          </h4>
                          <p className="text-[11px] font-semibold text-teal-700 truncate">
                            {doc.specialization}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                            <span>{doc.experience} Experience</span>
                            <span>•</span>
                            <span className="font-semibold text-slate-700">${doc.consultationFee || 85}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1 truncate">
                            {doc.availability}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onOpenDoctorModal(doc)}
                          className="text-xs font-semibold text-slate-600 hover:text-teal-700 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 transition"
                        >
                          View Bio
                        </button>
                        <button
                          onClick={() => handleConsultDermatologist(doc)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book with {doc.name.split(',')[0]}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
