'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { R2_MEDIA } from '@/lib/constants';
import {
  BookOpen,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Search,
  Check,
  X,
  AlertCircle,
  Sparkles,
  Layers,
  FileText,
  MapPin,
  Tag,
  ListPlus,
  Award,
} from 'lucide-react';

interface CourseModuleItem {
  number: string;
  title: string;
  description: string;
  topics?: string[];
  durationHours?: number;
}

interface CourseItem {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  category: string;
  tag?: string;
  duration: string;
  modes: string;
  campus?: string;
  admissionsStatus?: string;
  feeLKR?: number;
  targetAudience?: string;
  description: string;
  longDescription?: string;
  curriculumHighlights?: string[];
  modules?: CourseModuleItem[];
  active: boolean;
  image?: string;
  updatedAt: string;
}

function CoursesManager() {
  const searchParams = useSearchParams();
  const editSlug = searchParams?.get('edit');

  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'desc' | 'curriculum'>('hero');

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formShortTitle, setFormShortTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('English & Exams');
  const [formTag, setFormTag] = useState('');
  const [formDuration, setFormDuration] = useState('8 Weeks (60+ Hours)');
  const [formModes, setFormModes] = useState('In-Person & Live Online');
  const [formCampus, setFormCampus] = useState('A-9 Road, Kilinochchi');
  const [formAdmissions, setFormAdmissions] = useState('Now Enrolling');
  const [formFee, setFormFee] = useState<string>('');
  const [formAudience, setFormAudience] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formLongDesc, setFormLongDesc] = useState('');
  const [formHighlights, setFormHighlights] = useState('');
  const [formModules, setFormModules] = useState<CourseModuleItem[]>([]);
  const [formImage, setFormImage] = useState('');
  const [formActive, setFormActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // New module quick-add state
  const [newModNumber, setNewModNumber] = useState('');
  const [newModTitle, setNewModTitle] = useState('');
  const [newModDesc, setNewModDesc] = useState('');
  const [newModTopics, setNewModTopics] = useState('');

  const openEditModal = (c: CourseItem) => {
    setEditingCourse(c);
    setActiveTab('hero');
    setFormTitle(c.title || '');
    setFormShortTitle(c.shortTitle || c.title || '');
    setFormSlug(c.slug || '');
    setFormCategory(c.category || 'English & Exams');
    setFormTag(c.tag || '');
    setFormDuration(c.duration || '8 Weeks');
    setFormModes(c.modes || 'In-Person & Live Online');
    setFormCampus(c.campus || 'A-9 Road, Kilinochchi');
    setFormAdmissions(c.admissionsStatus || 'Now Enrolling');
    setFormFee(c.feeLKR ? String(c.feeLKR) : '');
    setFormAudience(c.targetAudience || '');
    setFormDesc(c.description || '');
    setFormLongDesc(c.longDescription || c.description || '');
    setFormHighlights(c.curriculumHighlights?.join('\n') || '');
    setFormModules(c.modules ? JSON.parse(JSON.stringify(c.modules)) : []);
    setFormImage(c.image || '');
    setFormActive(c.active !== undefined ? c.active : true);
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingCourse(null);
    setActiveTab('hero');
    setFormTitle('');
    setFormShortTitle('');
    setFormSlug('');
    setFormCategory('English & Exams');
    setFormTag('UKVI & Global University Recognized');
    setFormDuration('8 Weeks (60+ Hours)');
    setFormModes('In-Person (Kilinochchi) & Live Online');
    setFormCampus('A-9 Road, Kilinochchi');
    setFormAdmissions('Now Enrolling');
    setFormFee('');
    setFormAudience('IELTS candidates, students pursuing higher studies abroad & work visa applicants.');
    setFormDesc('Complete coaching for IELTS Academic & General Training with Cambridge preparation materials and mock speaking interviews.');
    setFormLongDesc('Our IELTS & UKVI preparation program is Northern Sri Lanka’s highest-rated training track with personalized feedback and real exam simulations.');
    setFormHighlights('Academic vs. General Training Distinction\nWriting Task 1 & Task 2 Mastery\nSpeaking One-on-One Interview Simulation\nListening Lab Training\nOfficial British Council & IDP Test Support');
    setFormModules([
      {
        number: 'Module 1',
        title: 'Introduction & Test Format',
        description: 'Exam overview, band scoring criteria (0-9), and biometric test center protocols.',
        topics: ['Band descriptors 7.0 - 9.0', 'UKVI security rules', 'Time management techniques'],
      },
      {
        number: 'Module 2',
        title: 'Listening & Audio Mastery',
        description: 'All 4 recorded sections featuring native British, Australian, and Canadian accents.',
        topics: ['Everyday social conversations', 'Community monologues', 'Academic discussions', 'University lectures'],
      },
    ]);
    setFormImage(R2_MEDIA.courses.ieltsUkvi);
    setFormActive(true);
    setShowModal(true);
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/courses');
      const data = await res.json();
      if (res.ok && data.success) {
        const loadedCourses: CourseItem[] = data.courses || [];
        setCourses(loadedCourses);

        // Check if navigated with ?edit=<slug>
        if (editSlug) {
          const match = loadedCourses.find(
            (c) => c.slug.toLowerCase() === editSlug.toLowerCase() || c.id === editSlug
          );
          if (match) {
            openEditModal(match);
          }
        }
      } else {
        setError(data.error || 'Failed to load courses.');
      }
    } catch (err) {
      console.error(err);
      setError('Network connection error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [editSlug]);

  const handleAddModule = () => {
    if (!newModTitle.trim()) {
      alert('Please enter a module title.');
      return;
    }
    const topicsArr = newModTopics
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

    setFormModules((prev) => [
      ...prev,
      {
        number: newModNumber.trim() || `Module ${prev.length + 1}`,
        title: newModTitle.trim(),
        description: newModDesc.trim(),
        topics: topicsArr,
      },
    ]);

    setNewModNumber('');
    setNewModTitle('');
    setNewModDesc('');
    setNewModTopics('');
  };

  const handleDeleteModule = (index: number) => {
    setFormModules((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDesc.trim()) {
      setError('Please provide course title and description.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const highlightsArr = formHighlights
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const payload = {
      title: formTitle.trim(),
      shortTitle: formShortTitle.trim() || formTitle.trim(),
      slug: formSlug.trim() || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: formCategory,
      tag: formTag.trim() || undefined,
      duration: formDuration.trim(),
      modes: formModes.trim(),
      campus: formCampus.trim() || 'A-9 Road, Kilinochchi',
      admissionsStatus: formAdmissions.trim() || 'Now Enrolling',
      feeLKR: formFee ? Number(formFee) : undefined,
      targetAudience: formAudience.trim(),
      description: formDesc.trim(),
      longDescription: formLongDesc.trim() || formDesc.trim(),
      curriculumHighlights: highlightsArr,
      modules: formModules,
      image: formImage.trim() || undefined,
      active: formActive,
    };

    try {
      if (editingCourse) {
        // Update
        const res = await fetch('/api/admin/courses', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingCourse.id, ...payload }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.error || 'Failed to update course.');
          setSubmitting(false);
          return;
        }
        setSuccessMsg(`"${payload.title}" updated successfully! Changes are live on the website.`);
      } else {
        // Create
        const res = await fetch('/api/admin/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.error || 'Failed to create course.');
          setSubmitting(false);
          return;
        }
        setSuccessMsg(`"${payload.title}" created successfully!`);
      }

      setShowModal(false);
      fetchCourses();
    } catch (err) {
      console.error(err);
      setError('Connection error while saving course.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (course: CourseItem) => {
    try {
      const res = await fetch('/api/admin/courses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: course.id, active: !course.active }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCourses((prev) =>
          prev.map((c) => (c.id === course.id ? { ...c, active: !c.active } : c))
        );
        setSuccessMsg(
          `Course "${course.title}" is now ${!course.active ? 'Active' : 'Paused'}.`
        );
      } else {
        setError(data.error || 'Failed to toggle course state.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error.');
    }
  };

  const handleDeleteCourse = async (course: CourseItem) => {
    if (!confirm(`Are you sure you want to delete "${course.title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/courses?id=${course.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCourses((prev) => prev.filter((c) => c.id !== course.id));
        setSuccessMsg(`Course "${course.title}" was deleted.`);
      } else {
        setError(data.error || 'Failed to delete course.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error while deleting course.');
    }
  };

  const categories = ['All', 'English & Exams', 'Information Technology', 'Foreign Languages'];

  const filtered = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#062343] tracking-tight">
            Courses, Batches &amp; Detail Page Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage course hero titles, delivery modes, duration pills, featured images, and curriculum modules live on the website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#0098DA] hover:bg-[#0086c2] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
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
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* FILTER BAR & SEARCH */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#0098DA] text-white shadow-xs'
                  : 'bg-slate-100/80 text-slate-600 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0098DA]"
          />
        </div>
      </div>

      {/* COURSES GRID */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <div className="w-8 h-8 border-4 border-[#0098DA] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs">Loading courses & batches...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 text-center text-slate-500 rounded-2xl border border-slate-200 text-sm">
          No courses matching your filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <div
              key={course.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                course.active ? 'border-slate-200 hover:border-sky-300' : 'border-rose-200/70 opacity-75'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-[#0098DA] border border-sky-200">
                    {course.category}
                  </span>
                  <button
                    onClick={() => handleToggleActive(course)}
                    className="inline-flex items-center gap-1 text-xs font-bold cursor-pointer"
                  >
                    {course.active ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Active
                      </span>
                    ) : (
                      <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-rose-500" />
                        Paused
                      </span>
                    )}
                  </button>
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#062343] line-clamp-1">
                    {course.title}
                  </h2>
                  {course.shortTitle && (
                    <span className="text-[11px] font-semibold text-slate-400">
                      Short: {course.shortTitle}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
                    <span className="truncate">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-[#0098DA] shrink-0" />
                    <span className="truncate">{course.modes}</span>
                  </div>
                </div>

                {course.tag && (
                  <div className="text-[11px] text-slate-500 truncate">
                    Includes: <strong className="text-slate-700">{course.tag}</strong>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(course)}
                    className="px-3 py-1.5 text-xs bg-sky-50 hover:bg-sky-100 text-[#0098DA] border border-sky-200 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Page</span>
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  href={`/ielts-courses/${course.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs text-[#0098DA] hover:text-[#0082ba] font-bold transition-colors bg-slate-50 hover:bg-sky-50 px-2.5 py-1.5 rounded-lg border border-slate-200"
                >
                  <span>View Public Page</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* COMPREHENSIVE COURSE PAGE EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0098DA]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#062343]">
                    {editingCourse ? `Edit Course Page: ${editingCourse.title}` : 'Add New Course Page'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Changes here directly update the public website course detail page.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('hero')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'hero'
                    ? 'bg-[#0098DA] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>1. Hero &amp; Badges</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('desc')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'desc'
                    ? 'bg-[#0098DA] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>2. Image &amp; Content</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('curriculum')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'curriculum'
                    ? 'bg-[#0098DA] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ListPlus className="w-3.5 h-3.5" />
                <span>3. Curriculum &amp; Modules ({formModules.length})</span>
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveCourse} className="space-y-4 flex-1">
              {/* TAB 1: HERO & BADGES */}
              {activeTab === 'hero' && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Course Full Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. IELTS & UKVI (Academic & General Training)"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Short Title / Breadcrumb
                      </label>
                      <input
                        type="text"
                        value={formShortTitle}
                        onChange={(e) => setFormShortTitle(e.target.value)}
                        placeholder="e.g. IELTS & UKVI"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={formSlug}
                        onChange={(e) => setFormSlug(e.target.value)}
                        placeholder="e.g. ielts-ukvi"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                      >
                        <option value="English & Exams">English &amp; Exams</option>
                        <option value="Exam Prep">Exam Prep</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Foreign Languages">Foreign Languages</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Admissions Status Badge
                      </label>
                      <input
                        type="text"
                        value={formAdmissions}
                        onChange={(e) => setFormAdmissions(e.target.value)}
                        placeholder="e.g. Now Enrolling"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Duration Pill
                      </label>
                      <input
                        type="text"
                        required
                        value={formDuration}
                        onChange={(e) => setFormDuration(e.target.value)}
                        placeholder="e.g. 8 Weeks (60+ Hours)"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Delivery Pill
                      </label>
                      <input
                        type="text"
                        required
                        value={formModes}
                        onChange={(e) => setFormModes(e.target.value)}
                        placeholder="e.g. In-Person & Live Online"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Includes / Tag Pill
                      </label>
                      <input
                        type="text"
                        value={formTag}
                        onChange={(e) => setFormTag(e.target.value)}
                        placeholder="e.g. UKVI & Life Skills A1/B1"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Campus Location
                      </label>
                      <input
                        type="text"
                        value={formCampus}
                        onChange={(e) => setFormCampus(e.target.value)}
                        placeholder="e.g. A-9 Road, Kilinochchi"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Course Fee (LKR - Optional)
                      </label>
                      <input
                        type="number"
                        value={formFee}
                        onChange={(e) => setFormFee(e.target.value)}
                        placeholder="e.g. 25000"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="activeCourse"
                      checked={formActive}
                      onChange={(e) => setFormActive(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0098DA] border-slate-300"
                    />
                    <label htmlFor="activeCourse" className="text-xs font-semibold text-slate-700 cursor-pointer">
                      Publish this course as Active (visible to students)
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: IMAGE & CONTENT */}
              {activeTab === 'desc' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <ImageUploadField
                    label="Course Featured Cover Image"
                    value={formImage}
                    onChange={setFormImage}
                    helperText="Upload a high-quality photo from your computer or choose from media."
                  />

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hero Banner Subtitle (Long Description)
                    </label>
                    <textarea
                      rows={3}
                      value={formLongDesc}
                      onChange={(e) => setFormLongDesc(e.target.value)}
                      placeholder="e.g. Complete, rigorous preparation for students and professionals targeting Band 7.5+ for universities, UKVI visas, and PR immigration across the UK, Canada, Australia, and New Zealand."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none leading-relaxed"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      This appears prominently right beneath the main title on the top banner.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Audience (&quot;Who Is This Course For?&quot;)
                    </label>
                    <textarea
                      rows={2}
                      value={formAudience}
                      onChange={(e) => setFormAudience(e.target.value)}
                      placeholder="e.g. Higher education aspirants, nurse migration, UK/Canada candidates"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Course Overview Summary
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="Summary of course structure, mock speaking tests, British Council support..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: CURRICULUM & MODULES */}
              {activeTab === 'curriculum' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  {/* Highlights Bullet Outcomes */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Curriculum Highlights (One key outcome per line)
                      </label>
                      <span className="text-[11px] text-[#0098DA] font-semibold">
                        Bullet Points
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={formHighlights}
                      onChange={(e) => setFormHighlights(e.target.value)}
                      placeholder="Academic vs. General Training Distinction&#10;Academic Writing Task 1 visual synthesis&#10;Writing Task 2 Band 8.0+ essay framework&#10;Listening audio labs with native accents"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none leading-relaxed"
                    />
                  </div>

                  {/* Modules List & Editor */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#062343] flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-[#0098DA]" />
                        <span>Syllabus Modules ({formModules.length})</span>
                      </h4>
                    </div>

                    {formModules.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">
                        No modules added yet. Add a module below.
                      </p>
                    ) : (
                      <div className="space-y-2.5">
                        {formModules.map((mod, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-start justify-between gap-3"
                          >
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-white bg-[#0A3663] px-2 py-0.5 rounded">
                                  {mod.number}
                                </span>
                                <h5 className="text-xs font-bold text-slate-800">
                                  {mod.title}
                                </h5>
                              </div>
                              <p className="text-[11px] text-slate-500">{mod.description}</p>
                              {mod.topics && mod.topics.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {mod.topics.map((top, tIdx) => (
                                    <span
                                      key={tIdx}
                                      className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded"
                                    >
                                      {top}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeleteModule(idx)}
                              className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                              title="Delete this module"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quick Add Module Box */}
                    <div className="p-3.5 bg-sky-50/60 border border-sky-100 rounded-xl space-y-2.5">
                      <h5 className="text-xs font-bold text-[#0A3663] flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Another Module</span>
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <input
                            type="text"
                            placeholder="Module 1"
                            value={newModNumber}
                            onChange={(e) => setNewModNumber(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            placeholder="Module Title (e.g. Speaking One-on-One Interview)"
                            value={newModTitle}
                            onChange={(e) => setNewModTitle(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        placeholder="Brief module description"
                        value={newModDesc}
                        onChange={(e) => setNewModDesc(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />

                      <textarea
                        rows={2}
                        placeholder="Topics covered (One topic per line)"
                        value={newModTopics}
                        onChange={(e) => setNewModTopics(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />

                      <button
                        type="button"
                        onClick={handleAddModule}
                        className="px-3 py-1.5 bg-[#0A3663] hover:bg-[#124C85] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Insert Module</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  {editingCourse && (
                    <Link
                      href={`/ielts-courses/${editingCourse.slug}`}
                      target="_blank"
                      className="text-xs text-[#0098DA] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Preview Live Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 bg-[#0098DA] hover:bg-[#0086c2] text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {submitting ? (
                      <span>Saving to live site...</span>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Course Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminCoursesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading course manager...</div>}>
      <CoursesManager />
    </Suspense>
  );
}
