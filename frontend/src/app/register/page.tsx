'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  UserCheck,
} from 'lucide-react';
import { ACADEMY_COURSES } from '@/lib/coursesData';
import { ACADEMY_INFO, R2_MEDIA } from '@/lib/constants';
import {
  downloadRegistrationDocument,
  printRegistrationForm,
  PrintableRegistrationData,
} from '@/lib/registrationPdf';

function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const preselectedCourse = searchParams.get('course') || 'ielts-ukvi';

  // Official Registration Serial Number (RK-2026-XXXX)
  const [regNo, setRegNo] = useState('');
  useEffect(() => {
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setRegNo(`RK-${year}-${randomDigits}`);
  }, []);

  const [formData, setFormData] = useState({
    regNo: '',
    firstName: '',
    lastName: '',
    dob: '',
    streetAddress: '',
    city: 'Kilinochchi',
    stateProvince: 'Northern Province',
    zipCode: '',
    email: '',
    phone: '',
    whatsapp: '',
    referral: 'Social Media',
    courseCategory: 'English',
    coursePreference: 'IELTS & UKVI (Academic & General Training)',
    details: '',
    preferredMode: 'offline', // physical vs online
    duration: '8 Weeks (60+ Hours)',
    totalFee: '45,000 LKR',
    paymentMethod: 'Cash',
    termsAccepted: false,
    signature: '',
    signatureDate: new Date().toISOString().split('T')[0],
  });

  // Handle course URL query parameter on initial load
  useEffect(() => {
    if (preselectedCourse) {
      const match = ACADEMY_COURSES.find(
        (c) => c.slug === preselectedCourse || c.id === preselectedCourse
      );
      if (match) {
        let cat = 'English';
        if (match.category === 'Information Technology') cat = 'Information Technology';
        else if (match.slug.includes('sinhala')) cat = 'Sinhala';
        else if (match.slug.includes('french')) cat = 'French';

        setFormData((prev) => ({
          ...prev,
          courseCategory: cat,
          coursePreference: match.title,
          duration: match.duration || '8 Weeks (60+ Hours)',
          totalFee: match.feeLKR ? `${match.feeLKR.toLocaleString()} LKR` : 'Contact Admissions',
        }));
      }
    }
  }, [preselectedCourse]);

  // Keep WhatsApp in sync if "Same as Mobile" checked
  const handlePhoneChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      phone: val,
      whatsapp: sameAsMobile ? val : prev.whatsapp,
    }));
  };

  const handleCategoryChange = (category: string) => {
    let defaultCourse = 'IELTS & UKVI (Academic & General Training)';
    let duration = '8 Weeks (60+ Hours)';
    let fee = '45,000 LKR';

    if (category === 'Sinhala') {
      defaultCourse = 'Diploma in Sinhala Language (සිංහල පාඨමාலாவ)';
      duration = '3 Months (36+ Hours)';
      fee = '25,000 LKR';
    } else if (category === 'Information Technology') {
      defaultCourse = 'Diploma in Information Technology (IT) & Software Skills';
      duration = '6 Months (Diploma)';
      fee = '55,000 LKR';
    } else if (category === 'French') {
      defaultCourse = 'French Language & DELF A1/A2 Certification';
      duration = '12 Weeks (48+ Hours)';
      fee = '38,000 LKR';
    } else if (category === 'Other') {
      defaultCourse = 'Special Customized Language Program';
      duration = 'Flexible';
      fee = 'Contact Admissions';
    }

    setFormData((prev) => ({
      ...prev,
      courseCategory: category,
      coursePreference: defaultCourse,
      duration,
      totalFee: fee,
    }));
  };

  const handleCourseSelect = (courseTitle: string) => {
    const course = ACADEMY_COURSES.find((c) => c.title === courseTitle);
    setFormData((prev) => ({
      ...prev,
      coursePreference: courseTitle,
      duration: course?.duration || prev.duration,
      totalFee: course?.feeLKR ? `${course.feeLKR.toLocaleString()} LKR` : prev.totalFee,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert('Please check and accept the Terms and Conditions in Section 11 to proceed.');
      return;
    }

    if (!formData.signature.trim()) {
      alert('Please enter your full name as Digital Signature in Section 11.');
      return;
    }

    setLoading(true);

    const submissionPayload = {
      ...formData,
      regNo: regNo || formData.regNo || `RK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: `${formData.firstName} ${formData.lastName}`.trim() || formData.signature,
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || 'Registration failed. Please try again or contact our hotline.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please call our admissions desk at 074 0224 355.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (submitted) {
    const currentRegistrationPayload: PrintableRegistrationData = {
      ...formData,
      regNo: regNo || formData.regNo,
      fullName: `${formData.firstName} ${formData.lastName}`.trim() || formData.signature,
    };

    return (
      <div className="bg-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-[#0A3663]/10 text-[#0A3663] text-xs font-black rounded-full tracking-wider uppercase">
              Registration Confirmed
            </span>
            <h1 className="text-3xl font-black text-[#0A3663] tracking-tight">
              Registration Submitted Successfully!
            </h1>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Thank you, <strong className="text-slate-900">{formData.firstName} {formData.lastName}</strong>. Your official admission application has been registered in the RK Academy database.
            </p>
          </div>

          {/* Registration Slip Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-semibold">Registration No:</span>
              <span className="font-mono font-bold text-[#0A3663] bg-white px-2.5 py-1 rounded-md border border-slate-200">
                {regNo}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-semibold">Selected Course:</span>
              <span className="font-bold text-slate-800">{formData.coursePreference}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-semibold">Mode of Study:</span>
              <span className="font-bold uppercase text-[#0098DA]">
                {formData.preferredMode === 'online' ? 'Live Online Virtual' : 'Physical In-Person (Kilinochchi)'}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-semibold">Contact Mobile:</span>
              <span className="font-bold text-slate-800">{formData.phone}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-semibold">Payment Method:</span>
              <span className="font-bold text-slate-800">{formData.paymentMethod}</span>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs sm:text-sm text-left">
            <p className="font-bold">Next Steps:</p>
            <p className="mt-1 text-blue-800">
              Our front desk admissions counselor will contact you via WhatsApp or phone call at <strong>{formData.phone}</strong> to confirm your batch timings, schedule orientation, and verify your admission documents.
            </p>
          </div>

          {/* DOWNLOAD & ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              disabled={downloadingPdf}
              onClick={async () => {
                setDownloadingPdf(true);
                try {
                  await downloadRegistrationDocument(currentRegistrationPayload);
                } finally {
                  setDownloadingPdf(false);
                }
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#0098DA] hover:bg-[#0086c2] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingPdf ? 'Generating PDF...' : 'Download Registration Form (PDF)'}</span>
            </button>
            <button
              onClick={() => printRegistrationForm(currentRegistrationPayload)}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print Form / Save as PDF</span>
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-6 md:py-10 print:bg-white print:py-0">
      <div className="site-container max-w-[1080px] mx-auto px-4 sm:px-6">

        {/* TOP BAR / CLEAN NAVIGATION */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 print:hidden">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </Link>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0098DA]">
                <FileText className="w-3.5 h-3.5" />
                <span>OFFICIAL ADMISSION DOCUMENT</span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-[#0A3663] tracking-tight">
                Student Registration Form
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={downloadingPdf}
              onClick={async () => {
                setDownloadingPdf(true);
                try {
                  await downloadRegistrationDocument({
                    ...formData,
                    regNo: regNo || formData.regNo,
                    fullName: `${formData.firstName} ${formData.lastName}`.trim(),
                  });
                } finally {
                  setDownloadingPdf(false);
                }
              }}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>{downloadingPdf ? 'Generating PDF...' : 'Download Form (PDF)'}</span>
            </button>
            <button
              type="button"
              onClick={() =>
                printRegistrationForm({
                  ...formData,
                  fullName: `${formData.firstName} ${formData.lastName}`.trim(),
                })
              }
              className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Form</span>
            </button>
            <a
              href="https://wa.me/94740224355"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>WhatsApp Help</span>
            </a>
          </div>
        </div>

        {/* OFFICIAL PAPER REPLICA FORM CONTAINER */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-300 overflow-hidden print:shadow-none print:border-none print:rounded-none">

          {/* OFFICIAL HEADER (Exact Match of RK Academy Physical Form Header with Official Logo) */}
          <div className="p-6 sm:p-8 border-b-2 border-[#0A3663] bg-gradient-to-b from-white to-slate-50">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
              
              {/* Logo & Academy Name */}
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200 p-2 flex items-center justify-center shadow-xs flex-shrink-0">
                  <img
                    src={R2_MEDIA.brand.logo}
                    alt="RK International Language Academy Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl sm:text-3xl font-black text-[#0A3663] tracking-tight leading-none uppercase">
                    RK INTERNATIONAL
                  </h2>
                  <h3 className="text-lg sm:text-2xl font-black text-[#0098DA] tracking-tight leading-none mt-1 uppercase">
                    LANGUAGE ACADEMY
                  </h3>
                  <p className="text-[11px] font-bold text-slate-500 italic mt-1">
                    The Way of Success • IELTS & English Language Institute
                  </p>
                </div>
              </div>

              {/* Form Title & Registration No */}
              <div className="text-center sm:text-right space-y-1.5">
                <div className="inline-block px-5 py-2 bg-[#0A3663] text-white text-sm sm:text-base font-black rounded-xl uppercase tracking-wide shadow-xs">
                  Student Registration Form
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-2 text-xs font-bold text-slate-700">
                  <span className="text-slate-500">Registration No:</span>
                  <span className="font-mono text-sm font-black text-[#0098DA] bg-white px-2.5 py-0.5 rounded-md border border-slate-300 shadow-2xs">
                    {regNo || 'RK-2026-XXXX'}
                  </span>
                </div>
              </div>

            </div>

            {/* Official Contact Metadata Bar (From physical header) */}
            <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0098DA] flex-shrink-0" />
                <span><strong>T.P:</strong> 074 0224 355 / 076 744 5019</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0098DA] flex-shrink-0" />
                <span><strong>Email:</strong> rkacademykili@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0098DA] flex-shrink-0" />
                <span><strong>Address:</strong> A-9 road, Near Theresamma kovil, Kilinochchi</span>
              </div>
            </div>
          </div>

          {/* MAIN FORM */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">

            {/* SECTION 01: Student Information */}
            <section className="space-y-4">
              <div className="bg-[#B8DCF5] text-[#0A3663] px-4 py-2 rounded-lg font-black text-sm tracking-wide flex items-center justify-between">
                <span>01. Student Information</span>
                <span className="text-xs font-bold opacity-75">Personal Record</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    First Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Last Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David / Selvarajah"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date of Birth <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Registration. No (Official Serial)
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={regNo || 'RK-2026-XXXX'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-100 font-mono font-bold text-[#0A3663]"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 02: Address */}
            <section className="space-y-4">
              <div className="bg-[#B8DCF5] text-[#0A3663] px-4 py-2 rounded-lg font-black text-sm tracking-wide flex items-center justify-between">
                <span>02. Address</span>
                <span className="text-xs font-bold opacity-75">Residential Address</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Street Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. No. 45, Main Street, Paranthan"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kilinochchi / Jaffna / Vavuniya"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    State / Province <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Northern Province"
                    value={formData.stateProvince}
                    onChange={(e) => setFormData({ ...formData, stateProvince: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Zip Code / Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 44000"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 03: Contact Information */}
            <section className="space-y-4">
              <div className="bg-[#B8DCF5] text-[#0A3663] px-4 py-2 rounded-lg font-black text-sm tracking-wide flex items-center justify-between">
                <span>03. Contact Information</span>
                <span className="text-xs font-bold opacity-75">Direct Lines</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. student@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 077 123 4567 / 074 022 4355"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      WhatsApp Number (For Batch Updates & Materials)
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsMobile}
                        onChange={(e) => {
                          setSameAsMobile(e.target.checked);
                          if (e.target.checked) {
                            setFormData((prev) => ({ ...prev, whatsapp: prev.phone }));
                          }
                        }}
                        className="rounded text-[#0098DA] focus:ring-[#0098DA]"
                      />
                      <span>Same as Mobile</span>
                    </label>
                  </div>
                  <input
                    type="tel"
                    placeholder="e.g. 077 123 4567"
                    value={formData.whatsapp}
                    disabled={sameAsMobile}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] ${
                      sameAsMobile ? 'bg-slate-100 text-slate-600' : 'bg-white'
                    }`}
                  />
                </div>
              </div>
            </section>

            {/* SECTION 04: Referral Details */}
            <section className="space-y-4">
              <div className="bg-[#B8DCF5] text-[#0A3663] px-4 py-2 rounded-lg font-black text-sm tracking-wide flex items-center justify-between">
                <span>04. Referral Details</span>
                <span className="text-xs font-bold opacity-75">How did you hear about us?</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'Friends', label: 'Friends' },
                  { id: 'Social Media', label: 'Social Media' },
                  { id: 'Individual', label: 'Individual' },
                  { id: 'Newspaper / Banner', label: 'Newspaper / Other' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer text-xs font-bold transition-all ${
                      formData.referral === item.id
                        ? 'bg-[#0A3663] text-white border-[#0A3663] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="referral"
                      value={item.id}
                      checked={formData.referral === item.id}
                      onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      formData.referral === item.id ? 'border-white bg-[#0098DA]' : 'border-slate-400'
                    }`}>
                      {formData.referral === item.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* SECTION 05: Course Details */}
            <section className="space-y-4">
              <div className="bg-[#B8DCF5] text-[#0A3663] px-4 py-2 rounded-lg font-black text-sm tracking-wide flex items-center justify-between">
                <span>05. Course Details</span>
                <span className="text-xs font-bold opacity-75">Select Category & Course</span>
              </div>

              {/* Category Checkboxes / Radios (Exact from paper form: English, Sinhala, IT, French, Other) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Category:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: 'English', label: 'English' },
                    { id: 'Sinhala', label: 'Sinhala' },
                    { id: 'Information Technology', label: 'IT' },
                    { id: 'French', label: 'French' },
                    { id: 'Other', label: 'Other' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`p-2.5 rounded-xl border text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        formData.courseCategory === cat.id
                          ? 'bg-[#0098DA] text-white border-[#0098DA] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 border-2 rounded-sm flex items-center justify-center ${
                        formData.courseCategory === cat.id ? 'border-white bg-white' : 'border-slate-400'
                      }`}>
                        {formData.courseCategory === cat.id && <div className="w-2 h-2 bg-[#0098DA]" />}
                      </div>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Course Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific Course / Program *
                </label>
                <select
                  value={formData.coursePreference}
                  onChange={(e) => handleCourseSelect(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white font-medium"
                >
                  {formData.courseCategory === 'English' && (
                    <>
                      <option value="IELTS & UKVI (Academic & General Training)">IELTS & UKVI (Academic & General Training) - Band 7.5+ Target</option>
                      <option value="Diploma in English & Spoken Fluency">Diploma in English & Spoken Fluency (Grammar & Pronunciation)</option>
                      <option value="PTE Academic Fast-Track">PTE Academic Fast-Track (Computerized Lab Mock Practice)</option>
                      <option value="Pearson Language Certifications">Pearson Language Certifications (A1, A2, B1, B2)</option>
                    </>
                  )}
                  {formData.courseCategory === 'Sinhala' && (
                    <option value="Diploma in Sinhala Language (සිංஹல පාඨමාලාව)">Diploma in Sinhala Language (සිංஹல පාඨමාලාව - Government & Corporate)</option>
                  )}
                  {formData.courseCategory === 'Information Technology' && (
                    <option value="Diploma in Information Technology (IT) & Software Skills">Diploma in Information Technology (IT) & Software Skills</option>
                  )}
                  {formData.courseCategory === 'French' && (
                    <option value="French Language & DELF A1/A2 Certification">French Language & DELF A1/A2 Certification (Immigration & TEF)</option>
                  )}
                  {formData.courseCategory === 'Other' && (
                    <option value="Custom Language Coaching">Custom One-on-One Language Coaching</option>
                  )}
                </select>
              </div>
            </section>

            {/* SECTION 06: Details */}
            <section className="space-y-4">
              <div className="bg-[#B8DCF5] text-[#0A3663] px-4 py-2 rounded-lg font-black text-sm tracking-wide flex items-center justify-between">
                <span>06. Details</span>
                <span className="text-xs font-bold opacity-75">Academic Background & Goals</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student Background / Target Exam Score / Goals:
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter previous qualifications (A/L, Degree), current English level, target IELTS band (e.g. 7.0 or 7.5+), and intended country (UK, Canada, Australia, etc.)..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white leading-relaxed"
                />
              </div>
            </section>

            {/* SECTION 07 & 08: Mode of Study & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* 07. Mode of Study */}
              <section className="space-y-4">
                <div className="bg-[#B8DCF5] text-[#0A3663] px-4 py-2 rounded-lg font-black text-sm tracking-wide flex items-center justify-between">
                  <span>07. Mode of Study</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredMode: 'offline' })}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      formData.preferredMode === 'offline'
                        ? 'bg-[#0A3663] text-white border-[#0A3663] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 border-2 rounded-sm flex items-center justify-center ${
                      formData.preferredMode === 'offline' ? 'border-white bg-white' : 'border-slate-400'
                    }`}>
                      {formData.preferredMode === 'offline' && <div className="w-2 h-2 bg-[#0A3663]" />}
                    </div>
                    <span>Physical (Campus)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredMode: 'online' })}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      formData.preferredMode === 'online'
                        ? 'bg-[#0098DA] text-white border-[#0098DA] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 border-2 rounded-sm flex items-center justify-center ${
                      formData.preferredMode === 'online' ? 'border-white bg-white' : 'border-slate-400'
                    }`}>
                      {formData.preferredMode === 'online' && <div className="w-2 h-2 bg-[#0098DA]" />}
                    </div>
                    <span>Online (Virtual)</span>
                  </button>
                </div>
              </section>

              {/* 08. Duration */}
              <section className="space-y-4">
                <div className="bg-[#B8DCF5] text-[#0A3663] px-4 py-2 rounded-lg font-black text-sm tracking-wide flex items-center justify-between">
                  <span>08. Duration</span>
                </div>

                <div>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 bg-white"
                  />
                </div>
              </section>

            </div>

            {/* SECTION 09 & 10: Course Fees & Method of Payment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* 09. Course Fees */}
              <section className="space-y-4">
                <div className="bg-[#B8DCF5] text-[#0A3663] px-4 py-2 rounded-lg font-black text-sm tracking-wide flex items-center justify-between">
                  <span>09. Course Fees</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-600">Total:</span>
                  <input
                    type="text"
                    value={formData.totalFee}
                    onChange={(e) => setFormData({ ...formData, totalFee: e.target.value })}
                    placeholder="e.g. 45,000 LKR"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-[#0A3663] bg-slate-50"
                  />
                </div>
              </section>

              {/* 10. Method of Payment */}
              <section className="space-y-4">
                <div className="bg-[#B8DCF5] text-[#0A3663] px-4 py-2 rounded-lg font-black text-sm tracking-wide flex items-center justify-between">
                  <span>10. Method of Payment</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'Cash', label: 'Cash' },
                    { id: 'Check', label: 'Check' },
                    { id: 'Card', label: 'Card' },
                    { id: 'Other', label: 'Other' },
                  ].map((pay) => (
                    <button
                      key={pay.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: pay.id })}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        formData.paymentMethod === pay.id
                          ? 'bg-[#0A3663] text-white border-[#0A3663] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-3 h-3 border-2 rounded-xs flex items-center justify-center ${
                        formData.paymentMethod === pay.id ? 'border-white bg-white' : 'border-slate-400'
                      }`}>
                        {formData.paymentMethod === pay.id && <div className="w-1.5 h-1.5 bg-[#0A3663]" />}
                      </div>
                      <span>{pay.label}</span>
                    </button>
                  ))}
                </div>
              </section>

            </div>

            {/* SECTION 11: Terms and conditions (Exact Bilingual English & Tamil Clauses from Physical Form) */}
            <section className="space-y-4 pt-4 border-t-2 border-slate-200">
              <div className="bg-[#B8DCF5] text-[#0A3663] px-4 py-2 rounded-lg font-black text-sm tracking-wide flex items-center justify-between">
                <span>11. Term and conditions :</span>
                <span className="text-xs font-bold opacity-75">விதிமுறைகள் மற்றும் நிபந்தனைகள்</span>
              </div>

              {/* Legal clauses list */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 text-xs text-slate-800 leading-relaxed">
                
                {/* Clause 1 */}
                <div className="space-y-1">
                  <p className="font-semibold text-slate-900">
                    <strong>1.</strong> I / We certify that the above information provided by me / us is correct.
                  </p>
                  <p className="text-slate-600 font-medium pl-4">
                    என்னால் வழங்கப்பட்ட தகவல்கள் அனைத்தும் உண்மையானவை என உறுதியளிக்கின்றேன்.
                  </p>
                </div>

                {/* Clause 2 */}
                <div className="space-y-1">
                  <p className="font-semibold text-slate-900">
                    <strong>2.</strong> I undertake to submit all the documents in original for verification.
                  </p>
                  <p className="text-slate-600 font-medium pl-4">
                    என்னால் வழங்கப்பட்ட ஆவணங்கள் அனைத்தும் உண்மையானவை என உறுதியளிக்கின்றேன்.
                  </p>
                </div>

                {/* Clause 3 */}
                <div className="space-y-1">
                  <p className="font-semibold text-slate-900">
                    <strong>3.</strong> The admission fee and course fee are strictly non-refundable, and applicants are advised to carefully consider their decision to enroll, as the fees paid are not eligible for reimbursement at any stage of the admission or enrollment process.
                  </p>
                  <p className="text-slate-600 font-medium pl-4 leading-normal">
                    நுழைவுக்கட்டணம் மற்றும் கற்கைநெறி கட்டணம் கண்டிப்பாக மீள்செலுத்தப்பட முடியாது. மேலும் விண்ணப்பதாரர்கள் நுழைவு மற்றும் கற்கைநெறி செயற்திட்டத்தின் எந்த கட்டத்திலும் கட்டணங்கள் மீளப்பெற முடியாது என்பதால், கற்பதற்கான தங்கள் முடிவை கவனமாக மேற்கொள்ள அறிவுறுத்தப்படுகிறார்கள்.
                  </p>
                </div>

                {/* Clause 4 */}
                <div className="space-y-1">
                  <p className="font-semibold text-slate-900">
                    <strong>4.</strong> Admission offers are valid for a period of one year from the date of acceptance.
                  </p>
                  <p className="text-slate-600 font-medium pl-4">
                    நுழைவுச் சலுகைகள் ஏற்றுக்கொள்ளப்பட்ட நாளிலிருந்து ஒரு வருட காலத்திற்குச் செல்லுபடியாகும்.
                  </p>
                </div>

              </div>

              {/* Agreement Checkbox */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="w-5 h-5 rounded text-[#0098DA] focus:ring-[#0098DA] mt-0.5 flex-shrink-0"
                  />
                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-slate-900 block">
                      I have read, understood, and accept all terms and conditions above. <span className="text-rose-500">*</span>
                    </span>
                    <span className="text-slate-600 block">
                      மேற்கண்ட அனைத்து விதிமுறைகளையும் நிபந்தனைகளையும் படித்து ஏற்றுக்கொள்கிறேன்.
                    </span>
                  </div>
                </label>
              </div>

              {/* Date & Signature Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.signatureDate}
                    onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Signature of student / Guardian (Type Full Legal Name) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John David Selvarajah"
                    value={formData.signature}
                    onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA] bg-white font-serif italic text-base text-[#0A3663]"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Typing your legal name serves as a binding electronic signature under electronic commerce guidelines.
                  </span>
                </div>
              </div>

            </section>

            {/* SUBMIT BUTTON */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Your application is encrypted and securely saved in RK Academy MongoDB.</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#0098DA] hover:bg-[#0086c2] text-white font-black text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Student Registration Form</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}


export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
          <div className="w-10 h-10 border-4 border-[#0098DA] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RegisterFormContent />
    </Suspense>
  );
}
