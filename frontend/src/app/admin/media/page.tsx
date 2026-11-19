'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  UploadCloud,
  Image as ImageIcon,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  RefreshCw,
  HardDrive,
  Cloud,
  AlertCircle,
  FileCheck,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface StoredImage {
  filename: string;
  url: string;
  size: number;
  uploadedAt: string;
  provider?: 'r2' | 'local';
}

export default function AdminMediaPage() {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [r2Active, setR2Active] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<StoredImage | null>(null);
  const [showR2Info, setShowR2Info] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/upload');
      const data = await res.json();
      if (res.ok && data.success) {
        setImages(data.images || []);
        setR2Active(Boolean(data.r2Active));
      } else {
        setError(data.error || 'Failed to load media files.');
      }
    } catch (err) {
      console.error('Fetch media error:', err);
      setError('Failed to connect to media storage.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/upload')
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (cancelled) return;
        if (ok && data.success) {
          setImages(data.images || []);
          setR2Active(Boolean(data.r2Active));
        } else {
          setError(data.error || 'Failed to load media files.');
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Fetch media error:', err);
        setError('Failed to connect to media storage.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleUploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    setSuccessMsg(null);

    let successCount = 0;
    let failedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.success) {
          successCount++;
        } else {
          failedCount++;
        }
      } catch (err) {
        console.error('Upload file error:', err);
        failedCount++;
      }
    }

    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (successCount > 0) {
      setSuccessMsg(`Successfully uploaded ${successCount} image${successCount > 1 ? 's' : ''}.`);
      fetchImages();
    }
    if (failedCount > 0) {
      setError(`Failed to upload ${failedCount} file${failedCount > 1 ? 's' : ''}. Please check file type and size (max 10MB).`);
    }
  };

  const handleCopy = (url: string) => {
    // Generate full URL if it is a relative path
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(url);
    setTimeout(() => {
      setCopiedUrl(null);
    }, 2500);
  };

  const handleDelete = async (img: StoredImage) => {
    if (!confirm(`Are you sure you want to delete "${img.filename}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/upload?filename=${encodeURIComponent(img.filename)}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(`"${img.filename}" was deleted successfully.`);
        setImages((prev) => prev.filter((item) => item.filename !== img.filename));
        if (selectedPreview?.filename === img.filename) {
          setSelectedPreview(null);
        }
      } else {
        setError(data.error || 'Failed to delete image.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError('Connection error while deleting file.');
    }
  };

  // Drag and drop handlers
  const [isDragging, setIsDragging] = useState(false);
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleUploadFiles(e.dataTransfer.files);
    }
  };

  const filtered = images.filter((img) =>
    img.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSizeMB = (
    images.reduce((acc, img) => acc + (img.size || 0), 0) /
    (1024 * 1024)
  ).toFixed(2);

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {r2Active ? (
              <>
                <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                  Cloudflare R2 Connected
                </span>
                <span className="text-xs text-slate-400">· Cloud CDN Active</span>
              </>
            ) : (
              <>
                <span className="text-xs font-bold text-[#0098DA] tracking-wider uppercase bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-[#0098DA]" />
                  Local Storage Connected
                </span>
                <span className="text-xs text-slate-400">· Ready for Cloudflare R2</span>
              </>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#062343] tracking-tight">
            Media & Image Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Upload, preview, copy URLs, and manage all images for Faculty, Courses, Batches, and Blog.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchImages()}
            disabled={loading}
            className="p-2.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl shadow-2xs transition-colors cursor-pointer"
            title="Refresh Media"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#0098DA]' : ''}`} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleUploadFiles(e.target.files)}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2.5 bg-[#0098DA] hover:bg-[#0086c2] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>Upload Images</span>
              </>
            )}
          </button>
        </div>
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
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">
            &times;
          </button>
        </div>
      )}

      {/* DRAG & DROP UPLOAD BANNER */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#0098DA] bg-sky-50/70 scale-[1.01]'
            : 'border-slate-200 bg-white hover:border-[#0098DA]/60 hover:bg-slate-50/50 shadow-xs'
        }`}
      >
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0098DA] mb-3 shadow-2xs">
            <UploadCloud className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-[#062343]">
            Drop files here or click to browse
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Supports JPG, PNG, WebP, GIF, SVG. Max file size: 10MB per image.
          </p>
          {r2Active ? (
            <span className="mt-3 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Saved directly to Cloudflare R2 Cloud Bucket (CDN)
            </span>
          ) : (
            <span className="mt-3 text-[11px] font-semibold text-[#0098DA] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Saved to Local Public Storage: /public/images/uploads/
            </span>
          )}
        </div>
      </div>

      {/* FILTER & STATS BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
          <div>
            Total Images: <strong className="text-[#0098DA]">{images.length}</strong>
          </div>
          <div className="text-slate-300">|</div>
          <div>
            Storage Used: <strong className="text-slate-900">{totalSizeMB} MB</strong>
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search files by name..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0098DA]"
          />
        </div>
      </div>

      {/* IMAGE GALLERY GRID */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <div className="w-8 h-8 border-4 border-[#0098DA] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs">Loading media library...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 text-center text-slate-500 rounded-2xl border border-slate-200 text-sm space-y-2">
          <ImageIcon className="w-12 h-12 mx-auto text-slate-300 mb-2" />
          <p className="font-bold text-slate-700">
            {searchTerm ? 'No media matching your search' : 'No images uploaded yet'}
          </p>
          <p className="text-xs text-slate-400">
            Upload your first photo above to use it across Trainers, Courses, or Blog.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((img) => (
            <div
              key={img.filename}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => setSelectedPreview(img)}
                className="w-full aspect-square bg-slate-100 relative cursor-pointer overflow-hidden"
              >
                <Image
                  src={img.url}
                  alt={img.filename}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                  <ExternalLink className="w-4 h-4" />
                  <span>Preview</span>
                </div>
              </div>

              {/* Meta & Info */}
              <div className="p-3 space-y-2">
                <div>
                  <p
                    className="text-xs font-bold text-slate-800 truncate"
                    title={img.filename}
                  >
                    {img.filename}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>{(img.size / 1024).toFixed(0)} KB</span>
                    <span
                      className={`px-1.5 py-0.2 rounded font-semibold ${
                        img.provider === 'r2'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {img.provider === 'r2' ? 'R2 Cloud' : 'Local'}
                    </span>
                    <span>
                      {new Date(img.uploadedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center justify-between gap-1 pt-1.5 border-t border-slate-100">
                  <button
                    onClick={() => handleCopy(img.url)}
                    className="flex-1 py-1 px-2 bg-sky-50 hover:bg-sky-100 text-[#0098DA] text-[11px] font-bold rounded-lg border border-sky-100 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    title="Copy Image URL to clipboard"
                  >
                    {copiedUrl === img.url ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(img)}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete image from server"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CLOUDFLARE R2 SWAP ARCHITECTURE INFORMATION */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          onClick={() => setShowR2Info(!showR2Info)}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0098DA]">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#062343]">
                {r2Active ? 'Cloudflare R2 Cloud Storage Active' : 'Cloudflare R2 Cloud Storage Setup'}
              </h4>
              <p className="text-[11px] text-slate-400">
                {r2Active
                  ? 'Current status: Connected to Cloudflare R2 bucket. All new uploads go straight to the cloud.'
                  : 'Current status: Connected to Local Filesystem. Learn how to connect Cloudflare R2 bucket.'}
              </p>
            </div>
          </div>
          {showR2Info ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showR2Info && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              Your media system is completely modular! Currently, images are saved directly in{' '}
              <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-800 font-mono">
                frontend/public/images/uploads/
              </code>{' '}
              and instantly served on the site.
            </p>
            <p>
              When you are ready to connect <strong>Cloudflare R2</strong>, simply add these environment variables to{' '}
              <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-800 font-mono">
                frontend/.env.local
              </code>
              :
            </p>
            <pre className="p-3 bg-[#062343] text-sky-200 rounded-xl font-mono text-[11px] overflow-x-auto">
{`R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=rk-academy-media
R2_PUBLIC_URL=https://media.rkacademy.lk`}
            </pre>
            <p className="text-[11px] text-slate-500">
              Zero changes will be needed to the UI or forms—all uploaded URLs will seamlessly point to your Cloudflare R2 custom domain or CDN!
            </p>
          </div>
        )}
      </div>

      {/* FULL-SIZE PREVIEW MODAL */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-3 p-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#062343] truncate max-w-md">
                {selectedPreview.filename}
              </h3>
              <button
                onClick={() => setSelectedPreview(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="relative w-full h-80 bg-slate-100 rounded-xl overflow-hidden">
              <Image
                src={selectedPreview.url}
                alt={selectedPreview.filename}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-500 font-mono truncate max-w-md">
                {selectedPreview.url}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(selectedPreview.url)}
                  className="px-3 py-1.5 bg-[#0098DA] hover:bg-[#0086c2] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedUrl === selectedPreview.url ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied URL</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <a
                  href={selectedPreview.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Original</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
