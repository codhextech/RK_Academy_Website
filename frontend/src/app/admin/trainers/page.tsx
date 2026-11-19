'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { R2_MEDIA } from '@/lib/constants';
import ImageUploadField from '@/components/admin/ImageUploadField';
import {
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Check,
  X,
  AlertCircle,
  Search,
  Award,
  BookOpen,
} from 'lucide-react';

interface TrainerItem {
  id: string;
  name: string;
  role: string;
  badge: string;
  image: string;
  organizationOrUniversity?: string;
  qualifications: string[];
  specialties: string[];
  active: boolean;
  updatedAt: string;
}

export default function AdminTrainersPage() {
  const [trainers, setTrainers] = useState<TrainerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<TrainerItem | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formImage, setFormImage] = useState<string>(R2_MEDIA.trainers.nepethika);
  const [formOrg, setFormOrg] = useState('RK International Language Academy');
  const [formQuals, setFormQuals] = useState('');
  const [formSpecs, setFormSpecs] = useState('');
  const [formActive, setFormActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/trainers');
      const data = await res.json();
      if (res.ok && data.success) {
        setTrainers(data.trainers || []);
      } else {
        setError(data.error || 'Failed to load faculty & trainers.');
      }
    } catch (err) {
      console.error(err);
      setError('Network connection error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const openAddModal = () => {
    setEditingTrainer(null);
    setFormName('');
    setFormRole('');
    setFormBadge('English & Examination Specialist');
    setFormImage(R2_MEDIA.trainers.nepethika);
    setFormOrg('RK International Language Academy');
    setFormQuals('Senior Lecturer in English\nCertified IELTS & PTE Coach\nBritish Council Trained Trainer');
    setFormSpecs('IELTS Academic & General Coaching\nPTE Academic Computer-Based Test Strategy\nSpoken English Fluency');
    setFormActive(true);
    setShowModal(true);
  };

  const openEditModal = (t: TrainerItem) => {
    setEditingTrainer(t);
    setFormName(t.name);
    setFormRole(t.role);
    setFormBadge(t.badge || '');
    setFormImage(t.image || R2_MEDIA.trainers.nepethika);
    setFormOrg(t.organizationOrUniversity || 'RK International Language Academy');
    setFormQuals(t.qualifications?.join('\n') || '');
    setFormSpecs(t.specialties?.join('\n') || '');
    setFormActive(t.active);
    setShowModal(true);
  };

  const handleSaveTrainer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formRole.trim()) {
      setError('Please provide trainer name and role.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      name: formName.trim(),
      role: formRole.trim(),
      badge: formBadge.trim() || 'Faculty Member',
      image: formImage.trim() || R2_MEDIA.trainers.nepethika,
      organizationOrUniversity: formOrg.trim(),
      qualifications: formQuals.split('\n').map((s) => s.trim()).filter(Boolean),
      specialties: formSpecs.split('\n').map((s) => s.trim()).filter(Boolean),
      active: formActive,
    };

    try {
      if (editingTrainer) {
        // Update
        const res = await fetch('/api/admin/trainers', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingTrainer.id, ...payload }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.error || 'Failed to update trainer.');
          setSubmitting(false);
          return;
        }
        setSuccessMsg(`Faculty member "${formName}" updated.`);
      } else {
        // Create
        const res = await fetch('/api/admin/trainers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.error || 'Failed to add trainer.');
          setSubmitting(false);
          return;
        }
        setSuccessMsg(`New faculty member "${formName}" added successfully.`);
      }

      setShowModal(false);
      fetchTrainers();
    } catch (err) {
      console.error(err);
      setError('Network connection error.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTrainer = async (t: TrainerItem) => {
    if (!confirm(`Are you sure you want to delete "${t.name}" from the faculty list?`)) return;

    try {
      const res = await fetch(`/api/admin/trainers?id=${t.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(`Faculty member "${t.name}" deleted.`);
        fetchTrainers();
      } else {
        setError(data.error || 'Failed to delete trainer.');
      }
    } catch (err) {
      console.error(err);
      setError('Error deleting trainer.');
    }
  };

  const handleToggleActive = async (t: TrainerItem) => {
    try {
      const res = await fetch('/api/admin/trainers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: t.id, active: !t.active }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTrainers((prev) =>
          prev.map((item) => (item.id === t.id ? { ...item, active: !t.active } : item))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter
  const filtered = trainers.filter((t) => {
    const cleanSearch = searchTerm.toLowerCase();
    return (
      t.name.toLowerCase().includes(cleanSearch) ||
      t.role.toLowerCase().includes(cleanSearch) ||
      t.badge.toLowerCase().includes(cleanSearch)
    );
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#062343] tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-7 h-7 text-[#0098DA]" />
            <span>Faculty & Trainers Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Add new lecturers, update instructor biographies, qualifications, and specialties shown on the website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#0098DA] hover:bg-[#0082ba] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Trainer / Staff</span>
        </button>
      </div>

      {/* FEEDBACK ALERTS */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700">
          Total Faculty & Staff: <strong className="text-[#0098DA]">{trainers.length}</strong>
        </span>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, role..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0098DA]"
          />
        </div>
      </div>

      {/* TRAINERS GRID */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <div className="w-8 h-8 border-4 border-[#0098DA] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs">Loading faculty members...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 text-center text-slate-500 rounded-2xl border border-slate-200 text-sm">
          No faculty members found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => (
            <div
              key={t.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                t.active ? 'border-slate-200 hover:border-sky-300' : 'border-rose-200/70 opacity-75'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative shrink-0">
                    <Image
                      src={t.image || R2_MEDIA.trainers.nepethika}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-[#0098DA] border border-sky-200 inline-block mb-1">
                      {t.badge || 'Faculty'}
                    </span>
                    <h2 className="text-base font-bold text-[#062343] truncate">{t.name}</h2>
                    <p className="text-xs text-slate-500 font-medium truncate">{t.role}</p>
                  </div>
                </div>

                {t.organizationOrUniversity && (
                  <p className="text-xs text-slate-600 font-medium">
                    🏢 {t.organizationOrUniversity}
                  </p>
                )}

                {t.qualifications && t.qualifications.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Qualifications:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {t.qualifications.slice(0, 3).map((q, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#0098DA]">•</span>
                          <span className="line-clamp-1">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(t)}
                  className="inline-flex items-center gap-1 text-xs font-bold cursor-pointer"
                >
                  {t.active ? (
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Active
                    </span>
                  ) : (
                    <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-rose-500" />
                      Hidden
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(t)}
                    className="px-2.5 py-1 text-xs bg-sky-50 hover:bg-sky-100 text-[#0098DA] border border-sky-200 rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteTrainer(t)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Trainer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT TRAINER MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#062343] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#0098DA]" />
                <span>{editingTrainer ? 'Edit Faculty Details' : 'Add New Trainer / Faculty'}</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTrainer} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. S. Ketheeswaran"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Role / Job Title</label>
                  <input
                    type="text"
                    required
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. Senior Lecturer & Language Specialist"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department / Badge</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="e.g. English, IELTS & PTE"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Organization / University</label>
                  <input
                    type="text"
                    value={formOrg}
                    onChange={(e) => setFormOrg(e.target.value)}
                    placeholder="e.g. RK International Language Academy"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Profile Photo"
                value={formImage}
                onChange={setFormImage}
                helperText="Upload a photo from your computer (JPG, PNG, WebP) or choose from media."
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Qualifications (One item per line)
                </label>
                <textarea
                  rows={3}
                  value={formQuals}
                  onChange={(e) => setFormQuals(e.target.value)}
                  placeholder="Senior English Language & Examination Lecturer&#10;IELTS, PTE & Pearson English Preparation Coach&#10;British Council Registration & Mock Examiner"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Key Teaching Specialties (One item per line)
                </label>
                <textarea
                  rows={3}
                  value={formSpecs}
                  onChange={(e) => setFormSpecs(e.target.value)}
                  placeholder="IELTS Academic & General Strategy&#10;PTE Computer AI Test Practice&#10;Vocabulary & Writing Band 7.5+ Techniques"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="activeTrainer"
                  checked={formActive}
                  onChange={(e) => setFormActive(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0098DA] border-slate-300"
                />
                <label htmlFor="activeTrainer" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Show this faculty member on the public website
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0098DA] hover:bg-[#0082ba] rounded-xl shadow-xs disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingTrainer ? 'Save Changes' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
