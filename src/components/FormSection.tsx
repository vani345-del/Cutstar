'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import DropZone from './DropZone';

/* ── Types ──────────────────────────────────────────── */
interface FormSectionProps {
  formType: 'artist' | 'agency';
  onBack: () => void;
}

interface ArtistFormData {
  name: string;
  email: string;
  projectName: string;
}

interface AgencyFormData {
  name: string;
  email: string;
  companyName: string;
  role: string;
}

/* ── Shared Styles ──────────────────────────────────── */
const inputClasses = [
  'w-full bg-[#1A1A24] border border-white/10 rounded-lg px-4 py-3 text-white',
  'placeholder:text-[#8A8A99]/50',
  'focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/50 focus:border-[#7C5CFC]/50',
  'transition-colors duration-200',
].join(' ');

const labelClasses = 'block text-sm text-[#8A8A99] mb-1.5';

/* ── Component ──────────────────────────────────────── */
export default function FormSection({ formType, onBack }: FormSectionProps) {
  /* Artist state */
  const [artistData, setArtistData] = useState<ArtistFormData>({
    name: '',
    email: '',
    projectName: '',
  });

  /* File state */
  const [songFiles, setSongFiles] = useState<File[]>([]);
  const [footageFiles, setFootageFiles] = useState<File[]>([]);

  /* Agency state */
  const [agencyData, setAgencyData] = useState<AgencyFormData>({
    name: '',
    email: '',
    companyName: '',
    role: '',
  });

  /* ── Handlers ─────────────────────────────────────── */
  const handleArtistChange = (field: keyof ArtistFormData, value: string) => {
    setArtistData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAgencyChange = (field: keyof AgencyFormData, value: string) => {
    setAgencyData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formType === 'artist') {
      console.log('Artist form submitted:', { ...artistData, songFiles, footageFiles });
    } else {
      console.log('Agency form submitted:', agencyData);
    }
  };

  /* ── Render ───────────────────────────────────────── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="max-w-lg mx-auto w-full"
    >
      {/* ── Close / Back Button ─────────────────────── */}
      <div className="flex justify-end mb-6">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="text-[#8A8A99] hover:text-white transition-colors duration-200 text-2xl leading-none p-1"
        >
          ×
        </button>
      </div>

      {/* ── Form ────────────────────────────────────── */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {formType === 'artist' ? (
          /* ── Artist Fields ──────────────────────────── */
          <>
            {/* Name */}
            <div>
              <label htmlFor="artist-name" className={labelClasses}>
                Name
              </label>
              <input
                id="artist-name"
                type="text"
                required
                placeholder="Your name"
                value={artistData.name}
                onChange={(e) => handleArtistChange('name', e.target.value)}
                className={inputClasses}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="artist-email" className={labelClasses}>
                Email
              </label>
              <input
                id="artist-email"
                type="email"
                required
                placeholder="you@example.com"
                value={artistData.email}
                onChange={(e) => handleArtistChange('email', e.target.value)}
                className={inputClasses}
              />
            </div>

            {/* Artist / Project Name */}
            <div>
              <label htmlFor="artist-project" className={labelClasses}>
                Artist / Project Name
              </label>
              <input
                id="artist-project"
                type="text"
                required
                placeholder="Your artist or project name"
                value={artistData.projectName}
                onChange={(e) => handleArtistChange('projectName', e.target.value)}
                className={inputClasses}
              />
            </div>

            {/* Upload Song */}
            <DropZone
              label="Upload Song"
              accept="audio/*"
              hint="MP3, WAV, FLAC, AAC"
              maxFiles={1}
              onFilesChange={setSongFiles}
            />

            {/* Upload Footage */}
            <DropZone
              label="Upload Footage"
              accept="video/*,image/*"
              hint="MP4, MOV, JPG, PNG"
              maxFiles={2}
              onFilesChange={setFootageFiles}
            />

            {/* Submit */}
            <button
              type="submit"
              className="bg-[#7C5CFC] hover:bg-[#6B4CE0] text-white font-semibold py-3 px-8 rounded-lg w-full transition-colors duration-200 mt-2"
            >
              Send It
            </button>
          </>
        ) : (
          /* ── Agency Fields ──────────────────────────── */
          <>
            {/* Name */}
            <div>
              <label htmlFor="agency-name" className={labelClasses}>
                Name
              </label>
              <input
                id="agency-name"
                type="text"
                required
                placeholder="Your name"
                value={agencyData.name}
                onChange={(e) => handleAgencyChange('name', e.target.value)}
                className={inputClasses}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="agency-email" className={labelClasses}>
                Email
              </label>
              <input
                id="agency-email"
                type="email"
                required
                placeholder="you@example.com"
                value={agencyData.email}
                onChange={(e) => handleAgencyChange('email', e.target.value)}
                className={inputClasses}
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="agency-company" className={labelClasses}>
                Company Name
              </label>
              <input
                id="agency-company"
                type="text"
                required
                placeholder="Your company"
                value={agencyData.companyName}
                onChange={(e) => handleAgencyChange('companyName', e.target.value)}
                className={inputClasses}
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="agency-role" className={labelClasses}>
                Role
              </label>
              <select
                id="agency-role"
                value={agencyData.role}
                onChange={(e) => handleAgencyChange('role', e.target.value)}
                className={`${inputClasses} appearance-none cursor-pointer`}
              >
                <option value="" disabled>
                  Select a role…
                </option>
                <option value="label">Label</option>
                <option value="agency">Agency</option>
                <option value="management">Management</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-[#7C5CFC] hover:bg-[#6B4CE0] text-white font-semibold py-3 px-8 rounded-lg w-full transition-colors duration-200 mt-2"
            >
              Request Access
            </button>
          </>
        )}
      </form>

      {/* ── Footer Note ─────────────────────────────── */}
      <p className="text-[#8A8A99]/60 text-sm text-center mt-6">
        We review every application. Selected applicants receive a private access
        code.
      </p>
    </motion.div>
  );
}
