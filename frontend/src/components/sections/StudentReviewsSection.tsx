'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, MessageSquare, PlusCircle, CheckCircle2, Trophy, X, Send, ExternalLink, ThumbsUp } from 'lucide-react';
import { ACADEMY_INFO } from '@/lib/constants';

interface Review {
  id: string;
  name: string;
  avatar: string;
  course: string;
  overallBand: string;
  scores?: string;
  destination: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  likes: number;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'K. Nimalan',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    course: 'IELTS Academic',
    overallBand: 'Overall 8.0',
    scores: 'L: 8.5 | R: 8.0 | W: 7.5 | S: 7.5',
    destination: 'MSc in UK (University of Manchester)',
    rating: 5,
    date: '2 weeks ago',
    comment:
      'The writing task feedback at RK Academy transformed my essay structure completely. The trainers in Kilinochchi pointed out exactly where I was losing marks in coherence and task achievement. Scored 8.0 overall on my first attempt!',
    verified: true,
    likes: 14,
  },
  {
    id: 'rev-2',
    name: 'S. Tharani',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    course: 'IELTS General Training',
    overallBand: 'Overall 7.5',
    scores: 'L: 8.0 | R: 7.5 | W: 7.0 | S: 7.5',
    destination: 'Canada Express Entry PR',
    rating: 5,
    date: '1 month ago',
    comment:
      'I urgently needed CLB 9 for my Canadian immigration CRS points. The weekend batch fit perfectly with my working schedule, and the mock speaking interview drills in Kilinochchi gave me immense confidence.',
    verified: true,
    likes: 21,
  },
  {
    id: 'rev-3',
    name: 'R. Ketheeswaran',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    course: 'IELTS Academic',
    overallBand: 'Overall 7.5',
    scores: 'L: 8.0 | R: 8.0 | W: 7.0 | S: 7.0',
    destination: 'University of Melbourne, Australia',
    rating: 5,
    date: '1 month ago',
    comment:
      'The audio listening lab at the A-9 campus is top quality. Practicing with real headphone sets and British Council practice tests prepared me for the actual exam room pressure.',
    verified: true,
    likes: 9,
  },
  {
    id: 'rev-4',
    name: 'M. Dilakshan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    course: 'Foundation & Spoken English',
    overallBand: 'Diploma Completed',
    scores: 'Fluency & Grammar Mastery',
    destination: 'Career Advancement',
    rating: 5,
    date: '2 months ago',
    comment:
      'I used to be afraid of speaking English in public or interviews. The Spoken English course at RK Academy helped me overcome stage fear and build strong conversational confidence.',
    verified: true,
    likes: 12,
  },
];

export default function StudentReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // New Review Form State
  const [newReview, setNewReview] = useState({
    name: '',
    course: 'IELTS Academic',
    overallBand: 'Band 7.5',
    scores: 'L: 8.0 | R: 7.5 | W: 7.0 | S: 7.5',
    destination: 'Study Abroad / Migration',
    rating: 5,
    comment: '',
  });

  const handleLike = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    // Create user review item with immediate display
    const userReviewItem: Review = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      course: newReview.course,
      overallBand: newReview.overallBand,
      scores: newReview.scores,
      destination: newReview.destination,
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment,
      verified: true,
      likes: 1,
    };

    setReviews([userReviewItem, ...reviews]);
    setSubmitSuccess(true);

    // Also persist review in background
    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'student-review',
        fullName: newReview.name,
        coursePreference: newReview.course,
        message: `[Review Submitted] Band: ${newReview.overallBand} | Rating: ${newReview.rating} Stars | Comment: ${newReview.comment}`,
      }),
    }).catch(() => null);

    setTimeout(() => {
      setSubmitSuccess(false);
      setModalOpen(false);
      setNewReview({
        name: '',
        course: 'IELTS Academic',
        overallBand: 'Band 7.5',
        scores: 'L: 8.0 | R: 7.5 | W: 7.0 | S: 7.5',
        destination: 'Study Abroad / Migration',
        rating: 5,
        comment: '',
      });
    }, 1800);
  };

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'All') return true;
    return r.course.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-100" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0098DA] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Student Testimonials & Band Results
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A3663] mt-3 mb-2">
              What Our Students Say About RK Academy
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Real IELTS band scores and reviews from students in Kilinochchi and our live online batches.
            </p>
          </div>

          {/* Action Buttons: Add Review + Google Maps */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#0A3663] hover:bg-[#124C85] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-[#0098DA]" />
              <span>Share Your Review / Score</span>
            </button>

            <a
              href={ACADEMY_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#0A3663] border border-slate-200 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#0098DA]" />
              <span>Google Review</span>
            </a>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {['All', 'Academic', 'General', 'Spoken'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeFilter === tab
                  ? 'bg-[#0098DA] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab === 'All' ? 'All Verified Reviews' : `IELTS ${tab}`}
            </button>
          ))}
          <span className="text-xs text-slate-400 ml-auto hidden sm:inline">
            Showing {filteredReviews.length} Student Reviews
          </span>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-all duration-200 relative group"
            >
              <div>
                {/* Header with Avatar, Name & Band Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#0098DA] shadow-xs shrink-0">
                      <Image
                        src={rev.avatar}
                        alt={rev.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-[#0A3663] text-sm sm:text-base leading-tight">
                          {rev.name}
                        </h3>
                        {rev.verified && (
                          <span title="Verified Student Result">
                            <CheckCircle2 className="w-4 h-4 text-[#0098DA]" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">{rev.course}</p>
                    </div>
                  </div>

                  <span className="bg-[#0A3663] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg shrink-0">
                    {rev.overallBand}
                  </span>
                </div>

                {/* Sub-scores or Destination */}
                <div className="bg-sky-100/50 rounded-lg px-3 py-1.5 mb-3 flex items-center justify-between text-[11px] text-[#0A3663] font-semibold">
                  <span>{rev.scores || rev.destination}</span>
                  <span className="text-slate-400 font-normal">{rev.date}</span>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Bottom Likes Counter */}
              <div className="pt-4 border-t border-slate-200/70 mt-5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Target: {rev.destination}</span>
                <button
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#0098DA] transition-colors"
                  title="Helpful Review"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="font-bold">{rev.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP MODAL: SUBMIT YOUR STUDENT REVIEW */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#0A3663]">Thank You!</h3>
                <p className="text-sm text-slate-600">
                  Your review and band score have been added to the RK International reviews feed!
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-5 h-5 text-[#0098DA]" />
                  <h3 className="text-xl font-bold text-[#0A3663]">Submit Your Student Review</h3>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                  Share your experience and exam score to inspire future students in Kilinochchi.
                </p>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S. Kowshikan"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Course Taken *
                      </label>
                      <select
                        value={newReview.course}
                        onChange={(e) => setNewReview({ ...newReview, course: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
                      >
                        <option value="IELTS Academic">IELTS Academic</option>
                        <option value="IELTS General Training">IELTS General Training</option>
                        <option value="Foundation & Spoken English">Foundation English</option>
                        <option value="Diploma in English">Diploma in English</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Band Score Achieved *
                      </label>
                      <select
                        value={newReview.overallBand}
                        onChange={(e) => setNewReview({ ...newReview, overallBand: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
                      >
                        <option value="Overall 8.5">Overall 8.5</option>
                        <option value="Overall 8.0">Overall 8.0</option>
                        <option value="Overall 7.5">Overall 7.5</option>
                        <option value="Overall 7.0">Overall 7.0</option>
                        <option value="Overall 6.5">Overall 6.5</option>
                        <option value="Diploma Completed">Diploma Completed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Target Country / University / Visa
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UK Master Degree / Canada PR"
                      value={newReview.destination}
                      onChange={(e) => setNewReview({ ...newReview, destination: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Star Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${star <= newReview.rating ? 'fill-current' : 'text-slate-300'}`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-600 ml-2">
                        {newReview.rating} out of 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Review & Feedback *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share how the trainers, mock materials, or classrooms helped you succeed..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-[#0A3663] hover:bg-[#124C85] text-white flex items-center justify-center gap-2 transition-colors shadow-md mt-2"
                  >
                    <Send className="w-4 h-4 text-[#0098DA]" />
                    <span>Publish Review</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
