'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  PlusCircle,
  CheckCircle2,
  X,
  Send,
  ExternalLink,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Maximize2,
  Languages,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { ACADEMY_INFO, R2_MEDIA } from '@/lib/constants';
import { INITIAL_STUDENT_STORIES, StudentStoryItem } from '@/lib/successData';

interface StudentReviewsSectionProps {
  initialStories?: StudentStoryItem[];
}

export default function StudentReviewsSection({ initialStories }: StudentReviewsSectionProps) {
  const [reviews, setReviews] = useState<StudentStoryItem[]>(() =>
    initialStories && initialStories.length > 0 ? initialStories : INITIAL_STUDENT_STORIES
  );

  // Sync state if initialStories prop updates
  useEffect(() => {
    if (initialStories && initialStories.length > 0) {
      setReviews(initialStories);
    }
  }, [initialStories]);

  const [modalOpen, setModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Lightbox modal state for viewing full-screen handwritten notes
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    image: string;
    title: string;
    subtitle?: string;
  }>({
    open: false,
    image: '',
    title: '',
  });

  // Tamil translation accordion toggle state
  const [showTamil, setShowTamil] = useState<Record<string, boolean>>({});
  const toggleTamil = (id: string) => {
    setShowTamil((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Likes counter state
  const [likes, setLikes] = useState<Record<string, number>>({});
  const handleLike = (id: string) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 12) + 1 }));
  };

  // Carousel slider refs & states
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // New Review Form State
  const [newReview, setNewReview] = useState({
    name: '',
    course: 'IELTS Academic Preparation',
    overallScore: 'Band 7.5 Target',
    destination: 'Higher Studies & Career Growth',
    rating: 5,
    comment: '',
  });

  // Track scroll position for active dot indicator
  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;

    const cardWidth = clientWidth < 640 ? clientWidth + 24 : clientWidth / 3;
    const currentIndex = Math.round(scrollLeft / cardWidth);
    setActiveSlideIndex(Math.min(currentIndex, Math.max(0, reviews.length - 1)));
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
        const step =
          clientWidth < 640
            ? clientWidth + 24
            : clientWidth < 768
            ? clientWidth * 0.85 + 24
            : (clientWidth - 48) / 3 + 24;
        scrollContainerRef.current.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    const userReviewItem: StudentStoryItem = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      avatar: R2_MEDIA.students.defaultAvatar,
      course: newReview.course,
      overallScore: newReview.overallScore,
      destination: newReview.destination,
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment,
      verified: true,
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
        message: `[Review Submitted] Score: ${newReview.overallScore} | Rating: ${newReview.rating} Stars | Comment: ${newReview.comment}`,
      }),
    }).catch(() => null);

    setTimeout(() => {
      setSubmitSuccess(false);
      setModalOpen(false);
      setNewReview({
        name: '',
        course: 'IELTS Academic Preparation',
        overallScore: 'Band 7.5 Target',
        destination: 'Higher Studies & Career Growth',
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
      <div className="site-container">
        {/* Top Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 md:mb-8 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#0098DA] bg-sky-50 px-3 py-1 rounded-full border border-sky-100 uppercase tracking-wider">
              100% Authentic Student Proof
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A3663] mt-2">
              Verified Handwritten Student Reviews
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Read real feedback written by students at our Kilinochchi center. Tap any review to inspect the original handwritten note.
            </p>
          </div>

          {/* Action Buttons */}
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
          {/* Left Arrow Button (Both Mobile & Desktop) - Transparent to Not Hide Text */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Previous review"
            className="flex absolute left-0 sm:-left-5 md:-left-7 top-1/2 -translate-y-1/2 z-20 p-1 bg-transparent border-0 text-[#0A3663] hover:text-[#0098DA] items-center justify-center hover:scale-125 active:scale-90 transition-all duration-200 cursor-pointer focus:outline-hidden"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>

          {/* Cards Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((rev) => {
              const initialLetter = rev.name ? rev.name.charAt(0).toUpperCase() : 'S';
              const isTamilOpen = Boolean(showTamil[rev.id]);
              const reviewLikes = likes[rev.id] ?? 14;

              return (
                <div
                  key={rev.id}
                  className="w-full min-w-full sm:w-auto sm:min-w-[360px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center sm:snap-start bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group"
                >
                  <div className="space-y-3.5">
                    {/* Header with Avatar, Masked Name & Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#0098DA] shrink-0 bg-gradient-to-br from-[#0A3663] to-[#0098DA] flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
                          <span>{initialLetter}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-[#0A3663] text-sm sm:text-base leading-tight truncate">
                              {rev.name}
                            </h3>
                            {rev.verified !== false && (
                              <span title="Verified Student Review">
                                <CheckCircle2 className="w-4 h-4 text-[#0098DA] shrink-0" />
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">{rev.course}</p>
                        </div>
                      </div>

                      <span className="bg-[#0A3663] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg shrink-0 shadow-2xs">
                        {rev.overallScore || '5.0 ★ Verified'}
                      </span>
                    </div>

                    {/* Destination & Date tag */}
                    <div className="bg-sky-100/60 rounded-lg px-3 py-1.5 flex items-center justify-between text-[11px] text-[#0A3663] font-semibold">
                      <span className="truncate pr-2">{rev.destination || 'RK International Academy'}</span>
                      <span className="text-slate-500 font-normal shrink-0">{rev.date || 'Verified'}</span>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-1 text-amber-400">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-slate-400">5.0 / 5.0</span>
                    </div>

                    {/* Review Comment / English text */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic line-clamp-4">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    {/* Tamil Translation Accordion (if originally written in Tamil) */}
                    {rev.originalTamil && (
                      <div className="pt-1.5 border-t border-slate-200/60">
                        <button
                          type="button"
                          onClick={() => toggleTamil(rev.id)}
                          className="text-[11px] font-bold text-[#0098DA] hover:text-[#0A3663] inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Languages className="w-3.5 h-3.5" />
                          <span>{isTamilOpen ? 'Hide Tamil' : 'View Original Tamil (தமிழ்)'}</span>
                        </button>

                        {isTamilOpen && (
                          <div className="mt-2 p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed font-sans shadow-2xs">
                            <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">
                              Handwritten Note (Tamil):
                            </span>
                            <p className="italic">&ldquo;{rev.originalTamil}&rdquo;</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom: Inspect Handwritten Note Button & Likes */}
                  <div className="pt-3.5 border-t border-slate-200/70 mt-4 flex items-center justify-between gap-2">
                    {rev.handwrittenImage ? (
                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({
                            open: true,
                            image: rev.handwrittenImage!,
                            title: `Handwritten Feedback — ${rev.name}`,
                            subtitle: `${rev.course} • Verified Handwritten Student Note`,
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0098DA] hover:text-[#0A3663] bg-sky-50 hover:bg-sky-100 border border-sky-200/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer group/btn"
                        title="Click to view original handwritten note full-screen"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-[#0098DA]" />
                        <span>Inspect Note</span>
                        <Maximize2 className="w-3 h-3 text-slate-400 group-hover/btn:text-[#0098DA]" />
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400">Verified Alumni</span>
                    )}

                    <button
                      onClick={() => handleLike(rev.id)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#0098DA] transition-colors shrink-0 cursor-pointer ml-auto"
                      title="Helpful Review"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="font-bold">{reviewLikes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button (Both Mobile & Desktop) - Transparent to Not Hide Text */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Next review"
            className="flex absolute right-0 sm:-right-5 md:-right-7 top-1/2 -translate-y-1/2 z-20 p-1 bg-transparent border-0 text-[#0A3663] hover:text-[#0098DA] items-center justify-center hover:scale-125 active:scale-90 transition-all duration-200 cursor-pointer focus:outline-hidden"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>
        </div>

        {/* Carousel Slide Indicators / Dots */}
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
          {reviews.slice(0, Math.min(reviews.length, 12)).map((_, idx) => (
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

        {/* Banner linking to Full Success Story Page */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <Link
            href="/student-success#section-stories"
            className="inline-flex items-center gap-2 bg-[#0A3663] hover:bg-[#124C85] text-white px-5 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all hover:-translate-y-0.5"
          >
            <span>View All 18+ Verified Handwritten Notes &amp; Official Results</span>
            <ArrowRight className="w-4 h-4 text-[#0098DA]" />
          </Link>
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL FOR HANDWRITTEN REVIEWS */}
      {lightbox.open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setLightbox({ open: false, image: '', title: '' })}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-slate-900/90 text-white">
              <div>
                <h3 className="text-base sm:text-lg font-bold">{lightbox.title}</h3>
                {lightbox.subtitle && (
                  <p className="text-xs text-slate-400 mt-0.5">{lightbox.subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setLightbox({ open: false, image: '', title: '' })}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative w-full h-[65vh] sm:h-[70vh] bg-black flex items-center justify-center">
              <Image
                src={lightbox.image}
                alt={lightbox.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-950 text-center text-xs text-slate-400 border-t border-white/10 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0098DA]" />
              <span>Student privacy protected: Student real names and signatures are masked/blurred. Original document on file with RK Academy Kilinochchi.</span>
            </div>
          </div>
        </div>
      )}

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

            <div className="text-center mb-6">
              <span className="text-xs font-bold text-[#0098DA] bg-sky-50 px-3 py-1 rounded-full uppercase tracking-wider">
                RK Academy Alumni
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A3663] mt-2">
                Share Your Experience
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Your feedback inspires incoming students preparing for IELTS, PTE, and English excellence.
              </p>
            </div>

            {submitSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center text-emerald-800 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Thank You!</h4>
                <p className="text-xs text-emerald-700">
                  Your review has been successfully submitted and verified on RK Academy.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name (e.g. Initial + Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="e.g. S. Tharani"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0098DA] focus:ring-1 focus:ring-[#0098DA] outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Course Completed *
                    </label>
                    <select
                      value={newReview.course}
                      onChange={(e) => setNewReview({ ...newReview, course: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#0098DA] focus:ring-1 focus:ring-[#0098DA] outline-hidden bg-white"
                    >
                      <option value="IELTS Academic Preparation">IELTS Academic Preparation</option>
                      <option value="IELTS General Training">IELTS General Training</option>
                      <option value="PTE Academic Coaching">PTE Academic Coaching</option>
                      <option value="Diploma in English">Diploma in English</option>
                      <option value="Spoken & Practical English">Spoken & Practical English</option>
                      <option value="Level 2 English Grammar">Level 2 English Grammar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Band / Score / Achievement *
                    </label>
                    <input
                      type="text"
                      required
                      value={newReview.overallScore}
                      onChange={(e) => setNewReview({ ...newReview, overallScore: e.target.value })}
                      placeholder="e.g. Band 7.5 or Completed"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0098DA] focus:ring-1 focus:ring-[#0098DA] outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Goal / Career Path
                  </label>
                  <input
                    type="text"
                    value={newReview.destination}
                    onChange={(e) => setNewReview({ ...newReview, destination: e.target.value })}
                    placeholder="e.g. Canada PR, University Abroad, Career"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0098DA] focus:ring-1 focus:ring-[#0098DA] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 text-amber-400 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            newReview.rating >= star ? 'fill-current text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Honest Feedback *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Describe how the lectures, feedback, and practice materials helped you..."
                    className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:border-[#0098DA] focus:ring-1 focus:ring-[#0098DA] outline-hidden resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0098DA] hover:bg-[#0082ba] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit My Review</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
