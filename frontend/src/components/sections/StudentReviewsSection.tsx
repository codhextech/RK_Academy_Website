'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Star,
  PlusCircle,
  CheckCircle2,
  Trophy,
  X,
  Send,
  ExternalLink,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
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
  {
    id: 'rev-5',
    name: 'A. Vaishnavi',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    course: 'IELTS Academic',
    overallBand: 'Overall 7.5',
    scores: 'L: 8.0 | R: 7.5 | W: 7.0 | S: 7.5',
    destination: 'NHS Nurse Registration, UK',
    rating: 5,
    date: '2 months ago',
    comment:
      'Required Band 7 in writing and 7.5 overall for UK nursing. The individual speaking assessments and regular writing corrections gave me the exact technique needed to pass with flying colors.',
    verified: true,
    likes: 17,
  },
  {
    id: 'rev-6',
    name: 'J. Pratheepan',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    course: 'PTE Academic Coaching',
    overallBand: 'Score 74 (Band 7.5+ Eqv)',
    scores: 'Speaking: 78 | Writing: 72',
    destination: 'Australia Skilled Migration Visa',
    rating: 5,
    date: '3 months ago',
    comment:
      'The computer lab practice and AI scoring breakdown at RK Academy helped me get my desired score in just 4 weeks. High recommended for anyone taking PTE in Northern Province!',
    verified: true,
    likes: 15,
  },
];

export default function StudentReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Carousel slider refs & states
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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

  // Track scroll position for active dot indicator
  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;

    const cardWidth = clientWidth < 640 ? clientWidth + 24 : clientWidth / 3;
    const currentIndex = Math.round(scrollLeft / cardWidth);
    setActiveSlideIndex(Math.min(currentIndex, reviews.length - 1));
  }, [reviews.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState);
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  // Arrow button click navigation (With smooth loop wrap-around)
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const { clientWidth, scrollLeft, scrollWidth } = scrollContainerRef.current;

    const step =
      clientWidth < 640
        ? clientWidth + 24
        : clientWidth < 1024
        ? (clientWidth - 24) / 2 + 24
        : (clientWidth - 48) / 3 + 24;

    if (direction === 'right') {
      if (scrollLeft >= scrollWidth - clientWidth - 25) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: step, behavior: 'smooth' });
      }
    } else {
      if (scrollLeft <= 25) {
        scrollContainerRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: -step, behavior: 'smooth' });
      }
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    const cardWidth = clientWidth < 640 ? clientWidth + 24 : (clientWidth - 48) / 3 + 24;
    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

      if (scrollLeft >= scrollWidth - clientWidth - 20) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const step = clientWidth < 640 ? clientWidth + 24 : clientWidth < 768 ? clientWidth * 0.85 + 24 : (clientWidth - 48) / 3 + 24;
        scrollContainerRef.current.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const handleLike = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

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

    // Scroll to the beginning to see the newly submitted review
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 100);

    // Persist review in background
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

  return (
    <section
      className="py-10 md:py-16 bg-white border-t border-slate-100 relative overflow-hidden"
      id="reviews"
      onMouseEnter={() => setIsAutoScrolling(false)}
      onMouseLeave={() => setIsAutoScrolling(true)}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Top Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 md:mb-8 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A3663]">
              Student Reviews
            </h2>
          </div>

          {/* Action Buttons + Carousel Arrow Navigation */}
          <div className="flex items-center justify-center md:justify-end gap-3 flex-wrap">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#0A3663] hover:bg-[#124C85] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-[#0098DA]" />
              <span>Share Your Review</span>
            </button>

            <a
              href={ACADEMY_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-[#0A3663] border border-slate-200 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#0098DA]" />
              <span>Google Review</span>
            </a>
          </div>
        </div>

        {/* Reviews Single-Row Carousel Container with Side Navigation Arrows */}
        <div className="relative group/reviews">
          {/* Left Arrow Button (Both Mobile & Desktop) - Default Transparent to Not Hide Text */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Previous review"
            className="flex absolute left-1 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-transparent text-[#0A3663] border border-[#0A3663]/40 items-center justify-center hover:bg-[#0A3663] hover:text-white hover:border-[#0A3663] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="w-full min-w-full sm:w-auto sm:min-w-[360px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center sm:snap-start bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group"
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
                    <span className="truncate pr-2">{rev.scores || rev.destination}</span>
                    <span className="text-slate-400 font-normal shrink-0">{rev.date}</span>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic line-clamp-4">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                {/* Bottom Likes Counter & Destination */}
                <div className="pt-4 border-t border-slate-200/70 mt-5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 truncate pr-2">Target: {rev.destination}</span>
                  <button
                    onClick={() => handleLike(rev.id)}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#0098DA] transition-colors shrink-0"
                    title="Helpful Review"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="font-bold">{rev.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button (Both Mobile & Desktop) - Default Transparent to Not Hide Text */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Next review"
            className="flex absolute right-1 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-transparent text-[#0A3663] border border-[#0A3663]/40 items-center justify-center hover:bg-[#0A3663] hover:text-white hover:border-[#0A3663] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#0098DA]"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Carousel Slide Indicators / Dots */}
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to review slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlideIndex === idx
                  ? 'w-7 bg-[#0098DA]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            ></button>
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
                      placeholder="e.g. John David"
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
                        <option value="PTE Academic Coaching">PTE Academic</option>
                        <option value="Diploma in English">Diploma in English</option>
                        <option value="Foundation & Spoken English">Foundation English</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Band / Score Achieved *
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
                        <option value="PTE 79+">PTE 79+</option>
                        <option value="PTE 65+">PTE 65+</option>
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
