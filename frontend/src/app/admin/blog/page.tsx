'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { R2_MEDIA } from '@/lib/constants';
import {
  FileText,
  Clock,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Check,
  X,
  AlertCircle,
  User,
} from 'lucide-react';

interface BlogItem {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  excerpt: string;
  content?: string;
  published: boolean;
  updatedAt: string;
}

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('Tips & Strategy');
  const [formReadTime, setFormReadTime] = useState('5 min read');
  const [formAuthor, setFormAuthor] = useState('S. Ketheeswaran');
  const [formAuthorRole, setFormAuthorRole] = useState('Senior IELTS Master Trainer');
  const [formImage, setFormImage] = useState<string>(R2_MEDIA.courses.ieltsUkvi);
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formPublished, setFormPublished] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      if (res.ok && data.success) {
        setBlogs(data.blogs || []);
      } else {
        setError(data.error || 'Failed to load blog articles.');
      }
    } catch (err) {
      console.error(err);
      setError('Network connection error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAddModal = () => {
    setEditingBlog(null);
    setFormTitle('');
    setFormSlug('');
    setFormCategory('Tips & Strategy');
    setFormReadTime('6 min read');
    setFormAuthor('S. Ketheeswaran');
    setFormAuthorRole('Senior IELTS & PTE Master Trainer');
    setFormImage(R2_MEDIA.courses.ieltsUkvi);
    setFormExcerpt('');
    setFormContent('');
    setFormPublished(true);
    setShowModal(true);
  };

  const openEditModal = (b: BlogItem) => {
    setEditingBlog(b);
    setFormTitle(b.title);
    setFormSlug(b.slug);
    setFormCategory(b.category);
    setFormReadTime(b.readTime);
    setFormAuthor(b.author);
    setFormAuthorRole(b.authorRole || '');
    setFormImage(b.image || '');
    setFormExcerpt(b.excerpt);
    setFormContent(b.content || b.excerpt);
    setFormPublished(b.published);
    setShowModal(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formExcerpt.trim()) {
      setError('Please provide article title and excerpt.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      title: formTitle.trim(),
      slug: formSlug.trim() || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: formCategory,
      readTime: formReadTime.trim(),
      author: formAuthor.trim(),
      authorRole: formAuthorRole.trim(),
      image: formImage.trim(),
      excerpt: formExcerpt.trim(),
      content: formContent.trim() || formExcerpt.trim(),
      published: formPublished,
    };

    try {
      if (editingBlog) {
        // Update
        const res = await fetch('/api/admin/blog', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, slug: editingBlog.slug }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.error || 'Failed to update article.');
          setSubmitting(false);
          return;
        }
        setSuccessMsg(`Article "${formTitle}" updated successfully.`);
      } else {
        // Create
        const res = await fetch('/api/admin/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.error || 'Failed to create article.');
          setSubmitting(false);
          return;
        }
        setSuccessMsg(`New article "${formTitle}" published successfully.`);
      }

      setShowModal(false);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      setError('Network connection error.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBlog = async (b: BlogItem) => {
    if (!confirm(`Are you sure you want to delete article "${b.title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blog?slug=${b.slug}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(`Article "${b.title}" deleted.`);
        fetchBlogs();
      } else {
        setError(data.error || 'Failed to delete article.');
      }
    } catch (err) {
      console.error(err);
      setError('Error deleting article.');
    }
  };

  const handleTogglePublished = async (b: BlogItem) => {
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: b.slug, published: !b.published }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBlogs((prev) =>
          prev.map((item) => (item.slug === b.slug ? { ...item, published: !b.published } : item))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter
  const filtered = blogs.filter((b) => {
    const matchesCategory = categoryFilter === 'All' || b.category === categoryFilter;
    const cleanSearch = searchTerm.toLowerCase();
    const matchesSearch =
      b.title.toLowerCase().includes(cleanSearch) ||
      b.author.toLowerCase().includes(cleanSearch) ||
      b.excerpt.toLowerCase().includes(cleanSearch);
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Exam Comparisons', 'Visa & Scores', 'Tips & Strategy', 'Local Guides'];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#062343] tracking-tight flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-[#0098DA]" />
            <span>Blog & Preparation Articles Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish new IELTS guides, edit existing student advice articles, or remove outdated posts.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#0098DA] hover:bg-[#0082ba] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
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

      {/* FILTER & SEARCH */}
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
            placeholder="Search articles..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0098DA]"
          />
        </div>
      </div>

      {/* ARTICLES TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-8 h-8 border-4 border-[#0098DA] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs">Loading articles...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No articles found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Article Details</th>
                  <th className="py-3 px-4 font-bold">Category</th>
                  <th className="py-3 px-4 font-bold">Author</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((b) => (
                  <tr key={b.slug} className="hover:bg-sky-50/30 transition-colors">
                    {/* Title & Excerpt */}
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="font-bold text-[#062343] line-clamp-1">{b.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{b.excerpt}</div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3 text-[#0098DA]" />
                        <span>{b.readTime}</span>
                        <span>•</span>
                        <span>{b.date}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-[#0098DA] border border-sky-200">
                        {b.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-slate-800 font-medium">{b.author}</div>
                      <div className="text-[10px] text-slate-400">{b.authorRole}</div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublished(b)}
                        className="inline-flex items-center gap-1 text-xs font-bold cursor-pointer"
                      >
                        {b.published ? (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            Published
                          </span>
                        ) : (
                          <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5 text-rose-500" />
                            Draft
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(b)}
                          className="px-2.5 py-1 text-xs bg-sky-50 hover:bg-sky-100 text-[#0098DA] border border-sky-200 rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(b)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-[#0098DA] hover:bg-sky-50 rounded-lg transition-colors"
                          title="View on site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT BLOG MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#062343] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0098DA]" />
                <span>{editingBlog ? 'Edit Blog Article' : 'Write New Article'}</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. 5 Common Mistakes Students Make in IELTS Speaking Part 2"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="e.g. ielts-speaking-mistakes"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                  >
                    <option value="Tips & Strategy">Tips & Strategy</option>
                    <option value="Exam Comparisons">Exam Comparisons</option>
                    <option value="Visa & Scores">Visa & Scores</option>
                    <option value="Local Guides">Local Guides</option>
                    <option value="Success Stories">Success Stories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Reading Time</label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    placeholder="e.g. 6 min read"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="e.g. S. Ketheeswaran"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Author Role</label>
                  <input
                    type="text"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    placeholder="e.g. Senior Master Trainer"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Featured Cover Image"
                value={formImage}
                onChange={setFormImage}
                helperText="Upload a blog cover from your computer (JPG, PNG, WebP) or choose from media."
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Excerpt / Summary</label>
                <textarea
                  rows={2}
                  required
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="A short 1-2 sentence preview of what the student will learn from this article..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Article Body Content</label>
                <textarea
                  rows={5}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Write the full advice, examination rules, key tips, and test preparation techniques..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="publishPost"
                  checked={formPublished}
                  onChange={(e) => setFormPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0098DA] border-slate-300"
                />
                <label htmlFor="publishPost" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Publish article live on the website immediately
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
                  {submitting ? 'Saving...' : editingBlog ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
