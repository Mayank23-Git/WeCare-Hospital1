import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Trash2,
  Bot,
  User,
  AlertTriangle,
  Calendar,
  Info,
  Clock,
  Award,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Building2,
  Stethoscope
} from 'lucide-react';
import { apiService } from '../services/api.js';

export default function AiAssistantPage({
  setActivePage,
  setSelectedDepartment,
  setSelectedDoctor,
  onOpenDoctorModal
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I am the WeCare AI Doctor Assistant. Describe your symptoms, medical concerns, or discomfort in everyday words, and I'll recommend the most appropriate clinical department and available specialist doctors to consult.",
      isWelcome: true
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const examplePrompts = [
    "I have frequent headaches and dizziness.",
    "I have had a sore throat for three days and it hurts when I swallow.",
    "I have a red itchy skin rash on my arms.",
    "I have severe tooth pain and swollen gums.",
    "I have difficulty hearing and ear pressure.",
    "I have sharp knee joint pain when walking."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    setErrorNotice(null);

    const userMessage = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content: text
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await apiService.getDoctorRecommendation(text);

      if (response && response.data) {
        const aiMessage = {
          id: 'ai_' + Date.now(),
          role: 'assistant',
          recommendation: response.data
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error('Invalid response structure received.');
      }
    } catch (err) {
      console.error('AI assistant error:', err);
      setErrorNotice(
        "Sorry, the AI assistant is temporarily unavailable. Please browse our departments or doctors directly."
      );

      const fallbackAiMessage = {
        id: 'ai_err_' + Date.now(),
        role: 'assistant',
        isErrorFallback: true,
        content: "I'm having trouble analyzing that request at the moment. You can browse our departments or view our doctor directory directly to book your appointment."
      };
      setMessages((prev) => [...prev, fallbackAiMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Chat cleared. What symptoms or health concerns would you like assistance with today?",
        isWelcome: true
      }
    ]);
    setErrorNotice(null);
  };

  // Navigates directly to the booking page with the doctor pre-selected!
  const handleBookDoctor = (doc, deptId) => {
    setSelectedDoctor(doc);
    setSelectedDepartment(deptId || doc.departmentId);
    setActivePage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-20 space-y-6">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Doctor Recommendation Assistant</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Clinical Symptom Routing Assistant
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Describe your symptoms in natural language. We analyze your description to recommend the right WeCare hospital department and available specialist doctors.
            </p>
          </div>

          <button
            onClick={handleClearChat}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/10 hover:bg-white/20 transition shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>
      </section>

      {/* Main Chat Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Safety Banner */}
        <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">Medical Safety Notice:</span> This AI assistant provides routing guidance to help you choose the right hospital doctor. It is <strong className="underline">NOT</strong> a diagnostic system, does not prescribe medications, and cannot replace a professional medical consultation. For chest pain, severe breathlessness, or trauma, call 911 / 112 immediately.
          </div>
        </div>

        {/* Chat Window */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl flex flex-col h-[650px] overflow-hidden">
          {/* Chat Messages Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Assistant Icon */}
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                {/* User Message Bubble */}
                {msg.role === 'user' ? (
                  <div className="max-w-[85%] sm:max-w-[70%] bg-teal-600 text-white p-4 rounded-2xl rounded-tr-xs shadow-md text-sm leading-relaxed">
                    {msg.content}
                  </div>
                ) : (
                  /* Assistant Message Bubble */
                  <div className="max-w-[95%] sm:max-w-[85%] space-y-4">
                    {/* Welcome or simple text message */}
                    {msg.content && (
                      <div className="bg-white p-4 sm:p-5 rounded-2xl rounded-tl-xs border border-slate-200 text-slate-800 text-sm shadow-xs leading-relaxed">
                        {msg.content}
                      </div>
                    )}

                    {/* STRUCTURED RECOMMENDATION CARD */}
                    {msg.recommendation && (
                      <div className="bg-white rounded-2xl border border-teal-200 shadow-md p-5 sm:p-6 space-y-5 animate-in fade-in duration-300">
                        {/* Emergency Warning if triggered */}
                        {msg.recommendation.isEmergency && (
                          <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-semibold flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 animate-bounce" />
                            <div>
                              <div className="font-bold text-rose-700 uppercase tracking-wider">
                                Potential Urgent / Emergency Symptoms Detected
                              </div>
                              <p className="mt-1 font-normal text-rose-800">
                                {msg.recommendation.emergencyAdvice ||
                                  "Your symptoms may require immediate medical attention. Please call emergency services (911 / 112) or proceed to the nearest emergency hospital department immediately."}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Suggested Department Header */}
                        <div>
                          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider">
                            <Building2 className="w-4 h-4" />
                            <span>Recommended Department</span>
                          </div>
                          <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                            {msg.recommendation.department}
                          </h3>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-teal-50/60 p-3 rounded-xl border border-teal-100">
                            {msg.recommendation.reason}
                          </p>
                        </div>

                        {/* Doctors List */}
                        <div className="space-y-3 pt-2 border-t border-slate-100">
                          <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                            <span>Available Specialists at WeCare Hospital</span>
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {msg.recommendation.recommendedDoctors?.map((doc) => (
                              <div
                                key={doc.doctorId}
                                className="p-4 rounded-xl border border-slate-200 hover:border-teal-300 bg-slate-50/50 hover:bg-white transition flex flex-col justify-between space-y-3"
                              >
                                <div>
                                  <div className="flex items-start gap-3">
                                    <img
                                      src={doc.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80"}
                                      alt={doc.name}
                                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white shadow-2xs"
                                    />
                                    <div className="min-w-0 flex-1">
                                      <h5 className="text-xs font-bold text-slate-900 truncate">
                                        {doc.name}
                                      </h5>
                                      <p className="text-[11px] font-semibold text-teal-700 truncate">
                                        {doc.specialization}
                                      </p>
                                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                                        <span>{doc.experience} Exp</span>
                                        <span>•</span>
                                        <span className="font-semibold text-slate-700">${doc.consultationFee || 75}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {doc.recommendationReason && (
                                    <p className="text-[11px] text-slate-600 mt-2.5 bg-white p-2 rounded-lg border border-slate-100 leading-snug">
                                      {doc.recommendationReason}
                                    </p>
                                  )}

                                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-500">
                                    <Clock className="w-3 h-3 text-teal-600 shrink-0" />
                                    <span className="truncate">{doc.availability}</span>
                                  </div>
                                </div>

                                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                                  <button
                                    onClick={() => onOpenDoctorModal(doc)}
                                    className="text-[11px] font-semibold text-slate-600 hover:text-teal-700 py-1.5 px-2 rounded-lg hover:bg-slate-100 transition"
                                  >
                                    View Doctor
                                  </button>

                                  <button
                                    onClick={() => handleBookDoctor(doc, msg.recommendation.departmentId)}
                                    className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-2xs transition"
                                  >
                                    <Calendar className="w-3 h-3" />
                                    <span>Book Appointment</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="text-[10px] text-slate-400 italic pt-2 border-t border-slate-100">
                          {msg.recommendation.disclaimer}
                        </div>
                      </div>
                    )}

                    {/* Fallback Buttons if AI had an error */}
                    {msg.isErrorFallback && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          onClick={() => {
                            setActivePage('departments');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-teal-800 border border-slate-200 transition"
                        >
                          Browse Departments
                        </button>
                        <button
                          onClick={() => {
                            setActivePage('doctors');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-teal-800 border border-slate-200 transition"
                        >
                          View Doctors
                        </button>
                        <button
                          onClick={() => {
                            setActivePage('booking');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white transition"
                        >
                          Book Appointment
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* User Icon */}
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-xs border border-slate-200 shadow-xs flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>Analyzing symptoms with clinical triage rules...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips Bar */}
          <div className="px-4 py-2.5 bg-slate-100/70 border-t border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0">
              Try example:
            </span>
            {examplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="px-3 py-1 rounded-full bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200/80 text-[11px] font-medium whitespace-nowrap transition disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Text Input Footer */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your symptoms or health concern (e.g. sore throat for three days, severe earache)..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 px-4 py-3.5 rounded-2xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition disabled:bg-slate-50"
              />

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || loading}
                className="p-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition shadow-md shadow-teal-600/25 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                title="Send description"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              Press Enter to send. Matches with real, active WeCare Hospital specialists.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
