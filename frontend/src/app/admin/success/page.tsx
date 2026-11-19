'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Trophy,
  Calendar,
  Quote,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Cloud,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MapPin,
  FileCheck,
  Sparkles,
  Loader2,
  FileText,
  Star,
} from 'lucide-react';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { R2_MEDIA } from '@/lib/constants';
import {
  ExamResultItem,
  AcademyEventItem,
  StudentStoryItem,
} from '@/lib/successData';

export default function AdminSuccessPage() {
  const [activeTab, setActiveTab] = useState<'results' | 'events' | 'stories'>('stories');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [examResults, setExamResults] = useState<ExamResultItem[]>([]);
  const [events, setEvents] = useState<AcademyEventItem[]>([]);
  const [stories, setStories] = useState<StudentStoryItem[]>([]);
  const [r2Active, setR2Active] = useState<boolean>(false);

  // Modals state
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [editingResultId, setEditingResultId] = useState<string | null>(null);
  const [resultForm, setResultForm] = useState<Omit<ExamResultItem, 'id'>>({
    studentName: '',
    examType: 'IELTS Academic',
    overallScore: 'Band 7.5',
    scores: 'L: 8.0 | R: 7.5 | W: 7.0 | S: 7.5',
    destination: '',
    avatar: R2_MEDIA.students.defaultAvatar,
    scorecardImage: '',
    date: 'November 2026',
    verified: true,
    quote: '',
  });

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState<Omit<AcademyEventItem, 'id'>>({
    title: '',
    category: 'Workshop',
    date: 'November 2026',
    location: 'RK International Kilinochchi Campus',
    image: '',
    description: '',
    badgeText: 'Official Orientation',
    featured: false,
  });

  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [storyForm, setStoryForm] = useState<Omit<StudentStoryItem, 'id'>>({
    name: '',
    course: 'Comprehensive English Coaching',
    destination: 'Higher Studies & Career Growth',
    overallScore: 'Teacher Kamshalini Mentorship',
    rating: 5,
    avatar: R2_MEDIA.students.defaultAvatar,
    date: 'October 2026',
    comment: '',
    originalTamil: '',
    handwrittenImage: '',
    verified: true,
  });

  // Load data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/success');
      const data = await res.json();
      if (res.ok && data.success) {
        setExamResults(data.examResults || []);
        setEvents(data.events || []);
        setStories(data.stories || []);
        setR2Active(Boolean(data.r2Active));
      }
    } catch {
      setMessage({ text: 'Failed to load success data.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Save / Update Exam Result
  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (editingResultId) {
        const res = await fetch('/api/admin/success', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'exam-result',
            id: editingResultId,
            updates: resultForm,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setMessage({ text: 'Exam result updated successfully.', type: 'success' });
          setResultModalOpen(false);
          fetchData();
        } else {
          setMessage({ text: data.error || 'Failed to update result.', type: 'error' });
        }
      } else {
        const res = await fetch('/api/admin/success', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'exam-result',
            data: resultForm,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setMessage({ text: 'Exam result added successfully.', type: 'success' });
          setResultModalOpen(false);
          fetchData();
        } else {
          setMessage({ text: data.error || 'Failed to add result.', type: 'error' });
        }
      }
    } catch {
      setMessage({ text: 'Connection error while saving.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteResult = async (id: string) => {
    if (!confirm('Are you sure you want to delete this exam result?')) return;
    try {
      const res = await fetch(`/api/admin/success?type=exam-result&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ text: 'Exam result deleted.', type: 'success' });
        fetchData();
      }
    } catch {
      setMessage({ text: 'Failed to delete item.', type: 'error' });
    }
  };

  // Save / Update Event
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (editingEventId) {
        const res = await fetch('/api/admin/success', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'event',
            id: editingEventId,
            updates: eventForm,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setMessage({ text: 'Academy event updated successfully.', type: 'success' });
          setEventModalOpen(false);
          fetchData();
        } else {
          setMessage({ text: data.error || 'Failed to update event.', type: 'error' });
        }
      } else {
        const res = await fetch('/api/admin/success', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'event',
            data: eventForm,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setMessage({ text: 'Academy event added successfully.', type: 'success' });
          setEventModalOpen(false);
          fetchData();
        } else {
          setMessage({ text: data.error || 'Failed to add event.', type: 'error' });
        }
      }
    } catch {
      setMessage({ text: 'Connection error while saving event.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`/api/admin/success?type=event&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ text: 'Event deleted.', type: 'success' });
        fetchData();
      }
    } catch {
      setMessage({ text: 'Failed to delete event.', type: 'error' });
    }
  };

  // Save / Update Story / Feedback
  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (editingStoryId) {
        const res = await fetch('/api/admin/success', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'story',
            id: editingStoryId,
            updates: storyForm,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setMessage({ text: 'Student review updated successfully.', type: 'success' });
          setStoryModalOpen(false);
          fetchData();
        } else {
          setMessage({ text: data.error || 'Failed to update review.', type: 'error' });
        }
      } else {
        const res = await fetch('/api/admin/success', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'story',
            data: storyForm,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setMessage({ text: 'Student review added successfully.', type: 'success' });
          setStoryModalOpen(false);
          fetchData();
        } else {
          setMessage({ text: data.error || 'Failed to add review.', type: 'error' });
        }
      }
    } catch {
      setMessage({ text: 'Connection error while saving review.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/admin/success?type=story&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ text: 'Student review deleted.', type: 'success' });
        fetchData();
      }
    } catch {
      setMessage({ text: 'Failed to delete review.', type: 'error' });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-[#0098DA] bg-sky-50 px-2 py-0.5 rounded border border-sky-100 uppercase tracking-wider">
              Student Showcase
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                r2Active
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              <Cloud className="w-3 h-3" />
              <span>{r2Active ? 'Cloudflare R2 Active' : 'Local Storage Fallback'}</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A3663]">
            Student Success, Events &amp; Feedback Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage official IELTS/PTE scorecards, academy event photos, and verified handwritten reviews.
          </p>
        </div>

        <a
          href="/student-success"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors shrink-0"
        >
          <span>View Public Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* ALERT MESSAGE */}
      {message && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs font-bold ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TAB NAVIGATION & ADD BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'stories'
                ? 'bg-[#0098DA] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            <span>Handwritten Reviews</span>
            <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded-full font-extrabold">
              {stories.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'results'
                ? 'bg-[#0098DA] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Exam Results &amp; TRFs</span>
            <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded-full font-extrabold">
              {examResults.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'events'
                ? 'bg-[#0098DA] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Academy Events</span>
            <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded-full font-extrabold">
              {events.length}
            </span>
          </button>
        </div>

        {/* Action Button */}
        <div>
          {activeTab === 'stories' && (
            <button
              onClick={() => {
                setEditingStoryId(null);
                setStoryForm({
                  name: 'R****i S.',
                  course: 'Comprehensive English Coaching',
                  destination: 'Higher Studies & Career Growth',
                  overallScore: 'Teacher Kamshalini Mentorship',
                  rating: 5,
                  avatar: R2_MEDIA.students.defaultAvatar,
                  date: 'November 2026',
                  comment: '',
                  originalTamil: '',
                  handwrittenImage: '',
                  verified: true,
                });
                setStoryModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0098DA] hover:bg-[#0080B8] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Student Review</span>
            </button>
          )}

          {activeTab === 'results' && (
            <button
              onClick={() => {
                setEditingResultId(null);
                setResultForm({
                  studentName: '',
                  examType: 'IELTS Academic',
                  overallScore: 'Band 7.5',
                  scores: 'L: 8.0 | R: 7.5 | W: 7.0 | S: 7.5',
                  destination: '',
                  avatar: R2_MEDIA.students.defaultAvatar,
                  scorecardImage: '',
                  date: 'November 2026',
                  verified: true,
                  quote: '',
                });
                setResultModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0098DA] hover:bg-[#0080B8] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Exam Result</span>
            </button>
          )}

          {activeTab === 'events' && (
            <button
              onClick={() => {
                setEditingEventId(null);
                setEventForm({
                  title: '',
                  category: 'Workshop',
                  date: 'November 2026',
                  location: 'RK International Kilinochchi Campus',
                  image: '',
                  description: '',
                  badgeText: 'Official Orientation',
                  featured: false,
                });
                setEventModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0098DA] hover:bg-[#0080B8] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          )}
        </div>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-[#0098DA] mb-2" />
          <p className="text-xs">Loading items...</p>
        </div>
      ) : (
        <>
          {/* TAB 1: STORIES / REVIEWS LIST */}
          {activeTab === 'stories' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Handwritten Image Preview */}
                    <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                      {story.handwrittenImage ? (
                        <Image
                          src={story.handwrittenImage}
                          alt={story.name}
                          fill
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                          <FileText className="w-8 h-8 text-slate-300 mb-1" />
                          <span className="text-xs">No handwritten note uploaded</span>
                        </div>
                      )}
                      <span className="absolute top-2.5 right-2.5 bg-[#0A3663] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow-xs">
                        {story.overallScore}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-[#0A3663] text-sm">{story.name}</h3>
                            {story.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#0098DA]" />}
                          </div>
                          <p className="text-xs font-semibold text-[#0098DA]">{story.course}</p>
                          <p className="text-[11px] text-slate-500">{story.destination}</p>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(story.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        &ldquo;{story.comment}&rdquo;
                      </p>

                      {story.originalTamil && (
                        <p className="text-[11px] text-slate-500 line-clamp-2 italic">
                          <span className="font-bold text-slate-400">Tamil: </span>
                          {story.originalTamil}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">{story.date}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingStoryId(story.id);
                          setStoryForm({
                            name: story.name,
                            course: story.course,
                            destination: story.destination,
                            overallScore: story.overallScore,
                            rating: story.rating || 5,
                            avatar: story.avatar || R2_MEDIA.students.defaultAvatar,
                            date: story.date,
                            comment: story.comment,
                            originalTamil: story.originalTamil || '',
                            handwrittenImage: story.handwrittenImage || '',
                            verified: story.verified,
                          });
                          setStoryModalOpen(true);
                        }}
                        className="p-1.5 text-slate-600 hover:text-[#0098DA] hover:bg-white rounded-lg transition-colors cursor-pointer"
                        title="Edit Review"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStory(story.id)}
                        className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: EXAM RESULTS LIST */}
          {activeTab === 'results' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {examResults.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                      {item.scorecardImage ? (
                        <Image
                          src={item.scorecardImage}
                          alt={item.studentName}
                          fill
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                          <FileCheck className="w-8 h-8 text-slate-300 mb-1" />
                          <span className="text-xs">No scorecard image uploaded</span>
                        </div>
                      )}
                      <span className="absolute top-2.5 right-2.5 bg-[#0A3663] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow-xs">
                        {item.overallScore}
                      </span>
                    </div>

                    <div className="p-4 space-y-2.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-extrabold text-[#0A3663] text-sm">{item.studentName}</h3>
                          {item.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#0098DA]" />}
                        </div>
                        <p className="text-xs font-semibold text-[#0098DA]">{item.examType}</p>
                        <p className="text-[11px] text-slate-500">{item.destination}</p>
                      </div>

                      <div className="bg-sky-50/70 p-2 rounded-lg border border-sky-100 text-[11px] font-medium text-slate-700">
                        {item.scores}
                      </div>

                      {item.quote && (
                        <p className="text-xs text-slate-600 line-clamp-2 italic leading-relaxed">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">{item.date}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingResultId(item.id);
                          setResultForm({
                            studentName: item.studentName,
                            examType: item.examType,
                            overallScore: item.overallScore,
                            scores: item.scores,
                            destination: item.destination,
                            avatar: item.avatar,
                            scorecardImage: item.scorecardImage,
                            date: item.date,
                            verified: item.verified,
                            quote: item.quote || '',
                          });
                          setResultModalOpen(true);
                        }}
                        className="p-1.5 text-slate-600 hover:text-[#0098DA] hover:bg-white rounded-lg transition-colors cursor-pointer"
                        title="Edit Result"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteResult(item.id)}
                        className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                        title="Delete Result"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: EVENTS LIST */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                      {evt.image ? (
                        <Image src={evt.image} alt={evt.title} fill className="object-cover" />
                      ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                          No photo
                        </div>
                      )}
                      <span className="absolute top-2.5 left-2.5 bg-[#0098DA] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-xs">
                        {evt.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Calendar className="w-3 h-3 text-[#0098DA]" />
                        <span>{evt.date}</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{evt.location}</span>
                      </div>

                      <h3 className="font-extrabold text-[#0A3663] text-sm leading-snug line-clamp-2">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    {evt.badgeText && (
                      <span className="text-[10px] font-bold text-[#0A3663] bg-sky-100 px-2 py-0.5 rounded">
                        {evt.badgeText}
                      </span>
                    )}
                    <div className="flex items-center gap-1.5 ml-auto">
                      <button
                        onClick={() => {
                          setEditingEventId(evt.id);
                          setEventForm({
                            title: evt.title,
                            category: evt.category,
                            date: evt.date,
                            location: evt.location,
                            image: evt.image,
                            description: evt.description,
                            badgeText: evt.badgeText || '',
                            featured: Boolean(evt.featured),
                          });
                          setEventModalOpen(true);
                        }}
                        className="p-1.5 text-slate-600 hover:text-[#0098DA] hover:bg-white rounded-lg transition-colors cursor-pointer"
                        title="Edit Event"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(evt.id)}
                        className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* MODAL 1: ADD/EDIT REVIEW */}
      {storyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-extrabold text-[#0A3663]">
                {editingStoryId ? 'Edit Student Review' : 'Add New Student Review'}
              </h2>
              <button
                onClick={() => setStoryModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStory} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Name (Privacy Masked)
                  </label>
                  <input
                    type="text"
                    required
                    value={storyForm.name}
                    onChange={(e) => setStoryForm({ ...storyForm, name: e.target.value })}
                    placeholder="e.g. R****i S. or K****n M."
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Use masked format e.g. R****i</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course Enrolled</label>
                  <input
                    type="text"
                    required
                    value={storyForm.course}
                    onChange={(e) => setStoryForm({ ...storyForm, course: e.target.value })}
                    placeholder="e.g. Comprehensive English Coaching"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Key Highlight Badge</label>
                  <input
                    type="text"
                    required
                    value={storyForm.overallScore}
                    onChange={(e) => setStoryForm({ ...storyForm, overallScore: e.target.value })}
                    placeholder="e.g. Teacher Kamshalini Mentorship"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target / Goal</label>
                  <input
                    type="text"
                    required
                    value={storyForm.destination}
                    onChange={(e) => setStoryForm({ ...storyForm, destination: e.target.value })}
                    placeholder="e.g. Higher Studies & Confidence"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Handwritten Review Photo (Cloudflare R2 Supported)
                </label>
                <ImageUploadField
                  label=""
                  value={storyForm.handwrittenImage || ''}
                  onChange={(url) => setStoryForm({ ...storyForm, handwrittenImage: url })}
                                  />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  English Feedback / Translation
                </label>
                <textarea
                  rows={3}
                  required
                  value={storyForm.comment}
                  onChange={(e) => setStoryForm({ ...storyForm, comment: e.target.value })}
                  placeholder="English translation or written English text..."
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Original Tamil Handwriting (Optional)
                </label>
                <textarea
                  rows={2}
                  value={storyForm.originalTamil || ''}
                  onChange={(e) => setStoryForm({ ...storyForm, originalTamil: e.target.value })}
                  placeholder="அசல் தமிழ் வரிகள் (விருப்பமானது)..."
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={storyForm.verified}
                    onChange={(e) => setStoryForm({ ...storyForm, verified: e.target.checked })}
                    className="rounded text-[#0098DA] focus:ring-[#0098DA]"
                  />
                  <span>Mark as Verified Student Review</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStoryModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-[#0098DA] hover:bg-[#0080B8] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : editingStoryId ? 'Save Changes' : 'Create Review'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD/EDIT EXAM RESULT */}
      {resultModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-extrabold text-[#0A3663]">
                {editingResultId ? 'Edit Exam Result' : 'Add New Exam Result'}
              </h2>
              <button
                onClick={() => setResultModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResult} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student Name</label>
                  <input
                    type="text"
                    required
                    value={resultForm.studentName}
                    onChange={(e) => setResultForm({ ...resultForm, studentName: e.target.value })}
                    placeholder="e.g. K. Nimalan"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Exam Category</label>
                  <select
                    value={resultForm.examType}
                    onChange={(e) =>
                      setResultForm({
                        ...resultForm,
                        examType: e.target.value as ExamResultItem['examType'],
                      })
                    }
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  >
                    <option value="IELTS Academic">IELTS Academic</option>
                    <option value="IELTS General">IELTS General</option>
                    <option value="PTE Academic">PTE Academic</option>
                    <option value="Diploma in English">Diploma in English</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Overall Band / Score</label>
                  <input
                    type="text"
                    required
                    value={resultForm.overallScore}
                    onChange={(e) => setResultForm({ ...resultForm, overallScore: e.target.value })}
                    placeholder="e.g. Band 8.0 or PTE 79"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Score Breakdown</label>
                  <input
                    type="text"
                    required
                    value={resultForm.scores}
                    onChange={(e) => setResultForm({ ...resultForm, scores: e.target.value })}
                    placeholder="e.g. L: 8.5 | R: 8.0 | W: 7.5 | S: 7.5"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Destination / Visa Purpose
                  </label>
                  <input
                    type="text"
                    required
                    value={resultForm.destination}
                    onChange={(e) => setResultForm({ ...resultForm, destination: e.target.value })}
                    placeholder="e.g. MSc in UK (Univ. of Manchester)"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Exam Date / Month</label>
                  <input
                    type="text"
                    required
                    value={resultForm.date}
                    onChange={(e) => setResultForm({ ...resultForm, date: e.target.value })}
                    placeholder="e.g. October 2026"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Scorecard / TRF Image (Cloudflare R2 Supported)
                </label>
                <ImageUploadField
                  label=""
                  value={resultForm.scorecardImage}
                  onChange={(url) => setResultForm({ ...resultForm, scorecardImage: url })}
                                  />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Quote (Optional)</label>
                <textarea
                  rows={2}
                  value={resultForm.quote}
                  onChange={(e) => setResultForm({ ...resultForm, quote: e.target.value })}
                  placeholder="Short testimonial about their achievement..."
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={resultForm.verified}
                    onChange={(e) => setResultForm({ ...resultForm, verified: e.target.checked })}
                    className="rounded text-[#0098DA] focus:ring-[#0098DA]"
                  />
                  <span>Mark as Verified Result</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setResultModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-[#0098DA] hover:bg-[#0080B8] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : editingResultId ? 'Save Changes' : 'Create Result'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD/EDIT EVENT */}
      {eventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-extrabold text-[#0A3663]">
                {editingEventId ? 'Edit Academy Event' : 'Add New Academy Event'}
              </h2>
              <button
                onClick={() => setEventModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="e.g. British Council Test Day Orientation"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Event Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        category: e.target.value as AcademyEventItem['category'],
                      })
                    }
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Ceremony">Ceremony</option>
                    <option value="Mock Exam">Mock Exam</option>
                    <option value="Academy Life">Academy Life</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={eventForm.badgeText}
                    onChange={(e) => setEventForm({ ...eventForm, badgeText: e.target.value })}
                    placeholder="e.g. Official Orientation"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Event Date</label>
                  <input
                    type="text"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    placeholder="e.g. November 2026"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    placeholder="e.g. RK Kilinochchi Campus"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Event Cover Photo (Cloudflare R2 Supported)
                </label>
                <ImageUploadField
                  label=""
                  value={eventForm.image}
                  onChange={(url) => setEventForm({ ...eventForm, image: url })}
                                  />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Detailed description of the event, workshop, or award ceremony..."
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0098DA] outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={eventForm.featured}
                    onChange={(e) => setEventForm({ ...eventForm, featured: e.target.checked })}
                    className="rounded text-[#0098DA] focus:ring-[#0098DA]"
                  />
                  <span>Feature on Public Page</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEventModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-[#0098DA] hover:bg-[#0080B8] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : editingEventId ? 'Save Changes' : 'Create Event'}
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
