'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquareCheck,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  Clock,
  Trash2,
  FileText,
  User,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Plus,
  X,
  BookOpen,
  Printer,
  Download,
  Building2,
  MapPin,
  CreditCard,
  CheckSquare,
  ShieldCheck,
} from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { R2_MEDIA } from '@/lib/constants';
import {
  downloadRegistrationDocument,
  printRegistrationForm,
} from '@/lib/registrationPdf';

interface NoteItem {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

interface Inquiry {
  id: string;
  type: 'contact' | 'register' | 'quick-lead';
  regNo?: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  dob?: string;
  streetAddress?: string;
  city?: string;
  stateProvince?: string;
  zipCode?: string;
  email?: string;
  phone: string;
  whatsapp?: string;
  referral?: string;
  courseCategory?: string;
  coursePreference?: string;
  details?: string;
  message?: string;
  preferredMode?: 'offline' | 'online';
  duration?: string;
  totalFee?: string | number;
  paymentMethod?: string;
  termsAccepted?: boolean;
  signature?: string;
  signatureDate?: string;
  status: 'new' | 'contacted' | 'enrolled' | 'lost';
  notes: NoteItem[];
  createdAt: string;
}

export default function EnquiriesAdminPage() {
  const [enquiries, setEnquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'register' | 'lead'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'enrolled' | 'lost'>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Inquiry | null>(null);
  const [viewingOfficialForm, setViewingOfficialForm] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadPdf = async (enq: Inquiry) => {
    setDownloadingId(enq.id);
    try {
      await downloadRegistrationDocument(enq);
    } finally {
      setDownloadingId(null);
    }
  };

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/enquiries');
      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries(data.enquiries || []);
      } else {
        setError(data.error || 'Failed to load inquiries.');
      }
    } catch (err) {
      console.error(err);
      setError('Network connection error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Inquiry['status']) => {
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Error changing status:', err);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !newNoteText.trim()) return;

    setSubmittingNote(true);
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedEnquiry.id,
          status: selectedEnquiry.status,
          note: newNoteText.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.enquiry) {
        setSelectedEnquiry(data.enquiry);
        setEnquiries((prev) =>
          prev.map((e) => (e.id === selectedEnquiry.id ? data.enquiry : e))
        );
        setNewNoteText('');
      }
    } catch (err) {
      console.error('Error adding note:', err);
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration record?')) return;

    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      } else {
        alert(data.error || 'Failed to delete inquiry.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered list
  const filtered = enquiries.filter((e) => {
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    const matchesType =
      typeFilter === 'all' ||
      (typeFilter === 'register' && e.type === 'register') ||
      (typeFilter === 'lead' && e.type !== 'register');
    const cleanSearch = searchTerm.toLowerCase();
    const matchesSearch =
      e.fullName.toLowerCase().includes(cleanSearch) ||
      e.phone.includes(cleanSearch) ||
      (e.regNo && e.regNo.toLowerCase().includes(cleanSearch)) ||
      (e.coursePreference && e.coursePreference.toLowerCase().includes(cleanSearch));
    return matchesStatus && matchesType && matchesSearch;
  });

  const registrationCount = enquiries.filter((e) => e.type === 'register').length;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0098DA]">
            <Building2 className="w-4 h-4" />
            <span>ADMISSIONS DESK & DATABASE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#062343] tracking-tight flex items-center gap-2.5">
            <MessageSquareCheck className="w-7 h-7 text-[#0098DA]" />
            <span>Student Registrations & Leads</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review official student registration forms, verify student records, update batch statuses, and print physical admission forms.
          </p>
        </div>
        <button
          onClick={fetchEnquiries}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-all self-start sm:self-auto cursor-pointer shadow-xs flex items-center gap-2"
        >
          <span>Refresh Database</span>
        </button>
      </div>

      {/* FILTER TABS & SEARCH */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        {/* Type & Status Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Main Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                typeFilter === 'all'
                  ? 'bg-white text-[#0A3663] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Records ({enquiries.length})
            </button>
            <button
              onClick={() => setTypeFilter('register')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                typeFilter === 'register'
                  ? 'bg-[#0098DA] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Official Registrations ({registrationCount})</span>
            </button>
            <button
              onClick={() => setTypeFilter('lead')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                typeFilter === 'lead'
                  ? 'bg-white text-[#0A3663] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Quick Leads & Inquiries ({enquiries.length - registrationCount})
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, phone, Reg No..."
              className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
            />
          </div>

        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 mr-1 uppercase tracking-wider">Status:</span>
          {[
            { id: 'all', label: 'All', count: enquiries.length },
            { id: 'new', label: 'New', count: enquiries.filter((e) => e.status === 'new').length },
            { id: 'contacted', label: 'Contacted', count: enquiries.filter((e) => e.status === 'contacted').length },
            { id: 'enrolled', label: 'Enrolled', count: enquiries.filter((e) => e.status === 'enrolled').length },
            { id: 'lost', label: 'Archived', count: enquiries.filter((e) => e.status === 'lost').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as typeof statusFilter)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? 'bg-[#0A3663] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                statusFilter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-8 h-8 border-4 border-[#0098DA] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs">Loading records from MongoDB...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No registrations matching the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Registration / Date</th>
                  <th className="py-3 px-4 font-bold">Student Name</th>
                  <th className="py-3 px-4 font-bold">Course & Category</th>
                  <th className="py-3 px-4 font-bold">Mode & Fees</th>
                  <th className="py-3 px-4 font-bold">Phone / WhatsApp</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((enq) => {
                  const whatsappClean = enq.whatsapp?.replace(/[^0-9]/g, '') || enq.phone.replace(/[^0-9]/g, '');
                  const isOfficialForm = enq.type === 'register' || Boolean(enq.regNo);

                  return (
                    <tr key={enq.id} className="hover:bg-sky-50/30 transition-colors">
                      {/* Date & Reg No */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {enq.regNo ? (
                          <div className="font-mono text-xs font-black text-[#0A3663] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block">
                            {enq.regNo}
                          </div>
                        ) : (
                          <div className="text-[10px] uppercase font-bold text-slate-400">
                            {enq.type === 'register' ? 'Registration' : 'Web Lead'}
                          </div>
                        )}
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          {new Date(enq.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </td>

                      {/* Name */}
                      <td className="py-3.5 px-4 font-bold text-[#062343]">
                        <div>{enq.fullName}</div>
                        {enq.city && (
                          <div className="text-[11px] font-normal text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{enq.city}</span>
                          </div>
                        )}
                      </td>

                      {/* Course */}
                      <td className="py-3.5 px-4">
                        <div className="text-[#0098DA] font-semibold">{enq.coursePreference || 'General Program'}</div>
                        <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                          Category: <strong>{enq.courseCategory || 'English'}</strong>
                        </div>
                      </td>

                      {/* Mode & Fees */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          enq.preferredMode === 'online'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {enq.preferredMode === 'online' ? 'Online Virtual' : 'Physical Campus'}
                        </span>
                        {enq.totalFee && (
                          <div className="text-xs font-bold text-slate-700 mt-1">
                            {enq.totalFee}
                          </div>
                        )}
                      </td>

                      {/* Phone & WhatsApp */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="text-slate-800 font-mono font-medium">{enq.phone}</div>
                        <div className="mt-1 flex items-center gap-2">
                          <a
                            href={`https://wa.me/${whatsappClean}?text=Hello%20${encodeURIComponent(enq.fullName)},%20thank%20you%20for%20registering%20with%20RK%20International%20Language%20Academy%20Kilinochchi.%20Your%20application%20(${enq.regNo || 'Registration'})%20has%20been%20received.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                            <span>WhatsApp Chat</span>
                          </a>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            handleStatusChange(enq.id, e.target.value as Inquiry['status'])
                          }
                          className={`text-xs font-bold rounded-lg px-2.5 py-1 border focus:outline-hidden cursor-pointer ${
                            enq.status === 'new'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : enq.status === 'contacted'
                              ? 'bg-sky-50 text-[#0098DA] border-sky-300'
                              : enq.status === 'enrolled'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          <option value="new">New Record</option>
                          <option value="contacted">Contacted</option>
                          <option value="enrolled">Enrolled</option>
                          <option value="lost">Archived</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {isOfficialForm ? (
                            <>
                              <button
                                disabled={downloadingId === enq.id}
                                onClick={() => handleDownloadPdf(enq)}
                                className="p-1.5 text-slate-500 hover:text-[#0098DA] hover:bg-sky-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                                title="Download PDF Form"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedEnquiry(enq);
                                  setViewingOfficialForm(true);
                                }}
                                className="px-2.5 py-1 text-xs bg-[#0A3663] hover:bg-[#08284a] text-white rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                                title="View & Print Official 2-Page Registration Form"
                              >
                                <FileText className="w-3 h-3 text-[#0098DA]" />
                                <span>View Form</span>
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedEnquiry(enq);
                                setViewingOfficialForm(false);
                              }}
                              className="px-2.5 py-1 text-xs bg-sky-50 hover:bg-sky-100 text-[#0098DA] border border-sky-200 rounded-lg font-bold transition-colors cursor-pointer"
                            >
                              Details ({enq.notes?.length || 0})
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(enq.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL 1: OFFICIAL PAPER REPLICA FORM VIEWER (For Printing & Complete Records) */}
      {selectedEnquiry && viewingOfficialForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto border border-slate-300">
            
            {/* Modal Header Actions */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0098DA]" />
                <span className="font-black text-[#0A3663] text-sm sm:text-base">
                  Official Student Registration Form
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                  Read-Only Record
                </span>
                {selectedEnquiry.regNo && (
                  <span className="font-mono text-xs font-bold text-[#0098DA] bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    {selectedEnquiry.regNo}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={downloadingId === selectedEnquiry.id}
                  onClick={() => handleDownloadPdf(selectedEnquiry)}
                  className="px-3.5 py-1.5 bg-[#0098DA] hover:bg-[#0086c2] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadingId === selectedEnquiry.id ? 'Generating PDF...' : 'Download Form (PDF)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => printRegistrationForm(selectedEnquiry)}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#0098DA]" />
                  <span>Print Form / PDF</span>
                </button>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PRINTABLE OFFICIAL FORM (Exact replica of RK Academy Paper Form) */}
            <div className="space-y-6 text-slate-900 border border-slate-300 rounded-xl p-6 sm:p-8 bg-white shadow-2xs">
              
              {/* Header */}
              <div className="border-b-2 border-[#0A3663] pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shadow-2xs flex-shrink-0">
                    <img
                      src={R2_MEDIA.brand.logo}
                      alt="RK Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-[#0A3663] uppercase tracking-tight leading-none">
                      RK INTERNATIONAL LANGUAGE ACADEMY
                    </h2>
                    <p className="text-xs font-bold text-slate-500 uppercase mt-0.5">
                      Student Registration Form
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs space-y-0.5">
                  <p><strong>T.P:</strong> 0740224355 / 076 744 5019</p>
                  <p><strong>Email:</strong> rkacademykili@gmail.com</p>
                  <p><strong>Address:</strong> A-9 road, Near Theresamma kovil, Kilinochchi</p>
                </div>
              </div>

              {/* 01. Student Information */}
              <div className="space-y-2">
                <div className="bg-[#B8DCF5] text-[#0A3663] px-3 py-1.5 rounded font-black text-xs uppercase tracking-wide">
                  01. Student Information
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">First Name:</span>
                    <strong className="text-slate-900">{selectedEnquiry.firstName || selectedEnquiry.fullName.split(' ')[0]}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Last Name:</span>
                    <strong className="text-slate-900">{selectedEnquiry.lastName || selectedEnquiry.fullName.split(' ').slice(1).join(' ') || '-'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Date of Birth:</span>
                    <strong className="text-slate-900">{selectedEnquiry.dob || 'Not specified'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Registration. No:</span>
                    <strong className="font-mono text-[#0098DA] font-bold">{selectedEnquiry.regNo || '-'}</strong>
                  </div>
                </div>
              </div>

              {/* 02. Address */}
              <div className="space-y-2">
                <div className="bg-[#B8DCF5] text-[#0A3663] px-3 py-1.5 rounded font-black text-xs uppercase tracking-wide">
                  02. Address
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div className="col-span-2">
                    <span className="text-slate-400 block font-medium">Street Address:</span>
                    <strong className="text-slate-900">{selectedEnquiry.streetAddress || 'Kilinochchi'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">City:</span>
                    <strong className="text-slate-900">{selectedEnquiry.city || 'Kilinochchi'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">State / Province:</span>
                    <strong className="text-slate-900">{selectedEnquiry.stateProvince || 'Northern Province'}</strong>
                  </div>
                  {selectedEnquiry.zipCode && (
                    <div>
                      <span className="text-slate-400 block font-medium">Zip Code:</span>
                      <strong className="text-slate-900">{selectedEnquiry.zipCode}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* 03. Contact Information */}
              <div className="space-y-2">
                <div className="bg-[#B8DCF5] text-[#0A3663] px-3 py-1.5 rounded font-black text-xs uppercase tracking-wide">
                  03. Contact Information
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Email:</span>
                    <strong className="text-slate-900">{selectedEnquiry.email || 'Not provided'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Mobile:</span>
                    <strong className="text-slate-900 font-mono">{selectedEnquiry.phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">WhatsApp:</span>
                    <strong className="text-slate-900 font-mono">{selectedEnquiry.whatsapp || selectedEnquiry.phone}</strong>
                  </div>
                </div>
              </div>

              {/* 04 & 05: Referral Details & Course Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="bg-[#B8DCF5] text-[#0A3663] px-3 py-1.5 rounded font-black text-xs uppercase tracking-wide">
                    04. Referral Details
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <span className="text-slate-400 block font-medium">Source:</span>
                    <strong className="text-slate-900">{selectedEnquiry.referral || 'Social Media'}</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="bg-[#B8DCF5] text-[#0A3663] px-3 py-1.5 rounded font-black text-xs uppercase tracking-wide">
                    05. Course Details
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                    <div>
                      <span className="text-slate-400 font-medium mr-2">Category:</span>
                      <strong className="text-[#0098DA]">{selectedEnquiry.courseCategory || 'English'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium mr-2">Course:</span>
                      <strong className="text-slate-900">{selectedEnquiry.coursePreference || 'IELTS & UKVI'}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* 06. Details */}
              <div className="space-y-2">
                <div className="bg-[#B8DCF5] text-[#0A3663] px-3 py-1.5 rounded font-black text-xs uppercase tracking-wide">
                  06. Details
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <p className="text-slate-800 leading-relaxed italic">
                    {selectedEnquiry.details || selectedEnquiry.message || 'Standard registration.'}
                  </p>
                </div>
              </div>

              {/* 07, 08, 09, 10: Mode, Duration, Fees, Payment */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">07. Mode of Study</span>
                  <strong className="text-[#0A3663] uppercase font-bold">
                    {selectedEnquiry.preferredMode === 'online' ? 'Online' : 'Physical'}
                  </strong>
                </div>

                <div className="space-y-1 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">08. Duration</span>
                  <strong className="text-slate-900 font-bold">
                    {selectedEnquiry.duration || '8 Weeks'}
                  </strong>
                </div>

                <div className="space-y-1 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">09. Course Fees</span>
                  <strong className="text-emerald-700 font-bold">
                    {selectedEnquiry.totalFee || 'Standard Fee'}
                  </strong>
                </div>

                <div className="space-y-1 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">10. Method of Payment</span>
                  <strong className="text-slate-900 font-bold">
                    {selectedEnquiry.paymentMethod || 'Cash'}
                  </strong>
                </div>
              </div>

              {/* 11. Terms and conditions */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="bg-[#B8DCF5] text-[#0A3663] px-3 py-1.5 rounded font-black text-xs uppercase tracking-wide">
                  11. Term and conditions :
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1.5 leading-relaxed">
                  <p>1. I / We certify that the above information provided by me / us is correct. (என்னால் வழங்கப்பட்ட தகவல்கள் அனைத்தும் உண்மையானவை என உறுதியளிக்கின்றேன்.)</p>
                  <p>2. I undertake to submit all the documents in original for verification. (என்னால் வழங்கப்பட்ட ஆவணங்கள் அனைத்தும் உண்மையானவை)</p>
                  <p>3. The admission fee and course fee are strictly non-refundable. (நுழைவுக்கட்டணம் மற்றும் கற்கைநெறி கட்டணம் கண்டிப்பாக மீள்செலுத்தப்பட முடியாது...)</p>
                  <p>4. Admission offers are valid for a period of one year from the date of acceptance. (நுழைவுச் சலுகைகள் ஏற்றுக்கொள்ளப்பட்ட நாளிலிருந்து ஒரு வருட காலத்திற்குச் செல்லுபடியாகும்.)</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Terms & Conditions Legally Accepted Online</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Date & Signature:</span>
                    <span className="font-serif italic font-bold text-slate-900">
                      {selectedEnquiry.signature || selectedEnquiry.fullName} ({selectedEnquiry.signatureDate || new Date(selectedEnquiry.createdAt).toISOString().split('T')[0]})
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Counselors Notes Section inside modal */}
            <div className="space-y-3 pt-4 border-t border-slate-200 print:hidden">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#062343] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#0098DA]" />
                <span>Internal Admissions Notes ({selectedEnquiry.notes?.length || 0})</span>
              </h4>

              <div className="space-y-2 max-h-36 overflow-y-auto">
                {(!selectedEnquiry.notes || selectedEnquiry.notes.length === 0) ? (
                  <p className="text-xs text-slate-400 italic">No notes recorded yet. Add follow-up notes below.</p>
                ) : (
                  selectedEnquiry.notes.map((note) => (
                    <div key={note.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                        <span className="font-bold text-[#0098DA]">By: {note.author}</span>
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-800">{note.text}</p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Add note (e.g. Called student, batch starts next Monday, payment confirmed)..."
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-hidden"
                />
                <button
                  type="submit"
                  disabled={submittingNote || !newNoteText.trim()}
                  className="px-4 py-2 bg-[#0098DA] hover:bg-[#0082ba] text-white text-xs font-bold rounded-xl cursor-pointer disabled:opacity-50"
                >
                  {submittingNote ? 'Saving...' : 'Add Note'}
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: SIMPLE NOTES MODAL (For general web leads) */}
      {selectedEnquiry && !viewingOfficialForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#062343]">{selectedEnquiry.fullName}</h3>
                <span className="text-xs text-[#0098DA] font-mono font-bold">{selectedEnquiry.phone}</span>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inquirer Details */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>
                  <span className="text-slate-400 block font-medium">Course:</span>
                  <strong className="text-slate-800">{selectedEnquiry.coursePreference || 'General'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Preferred Mode:</span>
                  <strong className="text-slate-800 uppercase">{selectedEnquiry.preferredMode || 'Offline'}</strong>
                </div>
                {selectedEnquiry.email && (
                  <div>
                    <span className="text-slate-400 block font-medium">Email:</span>
                    <span className="text-[#0098DA] font-semibold">{selectedEnquiry.email}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 block font-medium">Submission Date:</span>
                  <span className="text-slate-700">{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {selectedEnquiry.message && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400 block mb-1 font-medium">Student Note / Message:</span>
                  <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 italic">
                    &ldquo;{selectedEnquiry.message}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Internal Counselor Notes */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#062343] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#0098DA]" />
                <span>Internal Follow-up Notes ({selectedEnquiry.notes?.length || 0})</span>
              </h4>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {(!selectedEnquiry.notes || selectedEnquiry.notes.length === 0) ? (
                  <p className="text-xs text-slate-400 italic">No notes recorded yet. Add the first update below.</p>
                ) : (
                  selectedEnquiry.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-bold text-[#0098DA]">By: {note.author}</span>
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-800">{note.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-2 pt-2">
                <textarea
                  rows={2}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="e.g. Called student, explained course schedule..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-hidden"
                />
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={submittingNote || !newNoteText.trim()}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0098DA] hover:bg-[#0082ba] rounded-lg shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    {submittingNote ? 'Saving note...' : 'Add Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
