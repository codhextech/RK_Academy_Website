'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  UploadCloud,
  Image as ImageIcon,
  X,
  Check,
  Loader2,
  Link as LinkIcon,
  FolderOpen,
} from 'lucide-react';

interface StoredImage {
  filename: string;
  url: string;
  size: number;
  uploadedAt: string;
}

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  helperText = 'Upload a photo from your computer (JPG, PNG, WebP) or choose from media.',
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [libraryImages, setLibraryImages] = useState<StoredImage[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to upload image.');
        setUploading(false);
        return;
      }

      onChange(data.url);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Connection error while uploading.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const openLibraryPicker = async () => {
    setShowPickerModal(true);
    setLoadingLibrary(true);
    try {
      const res = await fetch('/api/admin/upload');
      const data = await res.json();
      if (res.ok && data.success) {
        setLibraryImages(data.images || []);
      }
    } catch (err) {
      console.error('Failed to load media library:', err);
    } finally {
      setLoadingLibrary(false);
    }
  };

  const handleClear = () => {
    onChange('');
    setError(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">{label}</label>
        <button
          type="button"
          onClick={() => setShowManualUrl(!showManualUrl)}
          className="text-[11px] font-semibold text-[#0098DA] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showManualUrl ? 'Hide URL input' : 'Paste URL directly'}</span>
        </button>
      </div>

      {/* Main Upload Box & Preview */}
      <div className="flex flex-col sm:flex-row items-start gap-3">
        {/* Thumbnail Preview Area */}
        {value ? (
          <div className="w-24 h-24 rounded-2xl border border-slate-200 bg-slate-100 overflow-hidden relative shrink-0 shadow-2xs group">
            <Image
              src={value}
              alt="Image preview"
              fill
              className="object-cover"
              onError={() => setError('Image failed to load')}
            />
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
              title="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 shrink-0">
            <ImageIcon className="w-6 h-6 text-slate-300 mb-1" />
            <span className="text-[10px] text-slate-400 font-medium">No Image</span>
          </div>
        )}

        {/* Action Buttons & Helpers */}
        <div className="flex-1 w-full space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-wrap items-center gap-2">
            {/* Direct Computer Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0098DA]" />
                  <span>Uploading image...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5 text-[#0098DA]" />
                  <span>{value ? 'Upload New Image' : 'Upload from Computer'}</span>
                </>
              )}
            </button>

            {/* Media Library Browse Button */}
            <button
              type="button"
              onClick={openLibraryPicker}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>Browse Media</span>
            </button>

            {value && (
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                <Check className="w-3 h-3 text-emerald-600" />
                Attached
              </span>
            )}
          </div>

          {/* Manual URL Input (Collapsible) */}
          {showManualUrl && (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="e.g. /images/trainers/photo.jpg or https://..."
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-[#0098DA] focus:outline-none font-mono"
            />
          )}

          <p className="text-[11px] text-slate-400 leading-tight">{helperText}</p>

          {error && (
            <p className="text-xs text-rose-600 font-medium">{error}</p>
          )}
        </div>
      </div>

      {/* MEDIA PICKER MODAL */}
      {showPickerModal && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-5 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-[#0098DA]" />
                <h3 className="text-sm font-bold text-[#062343]">Select from Uploaded Media Library</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPickerModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto min-h-[220px]">
              {loadingLibrary ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <Loader2 className="w-8 h-8 animate-spin text-[#0098DA] mb-2" />
                  <p className="text-xs">Loading media files...</p>
                </div>
              ) : libraryImages.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <ImageIcon className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-xs font-semibold text-slate-500">No media uploaded yet.</p>
                  <p className="text-[11px] text-slate-400">
                    Click &apos;Upload from Computer&apos; to upload your first image.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {libraryImages.map((img) => (
                    <button
                      key={img.filename}
                      type="button"
                      onClick={() => {
                        onChange(img.url);
                        setShowPickerModal(false);
                      }}
                      className={`group relative rounded-xl border overflow-hidden text-left transition-all p-1.5 flex flex-col items-center bg-slate-50 hover:bg-sky-50 cursor-pointer ${
                        value === img.url ? 'border-[#0098DA] ring-2 ring-sky-200 bg-sky-50/50' : 'border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      <div className="w-full h-24 rounded-lg bg-white overflow-hidden relative mb-1.5">
                        <Image
                          src={img.url}
                          alt={img.filename}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-[11px] font-semibold text-slate-700 truncate w-full px-1">
                        {img.filename}
                      </p>
                      <span className="text-[9px] text-slate-400 self-start px-1">
                        {(img.size / 1024).toFixed(0)} KB
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-400">
                {libraryImages.length} image{libraryImages.length !== 1 ? 's' : ''} in library
              </span>
              <button
                type="button"
                onClick={() => setShowPickerModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
