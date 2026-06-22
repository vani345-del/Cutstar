'use client';

import { useCallback, useRef, useState } from 'react';

interface DropZoneProps {
  label: string;
  accept?: string;
  maxFiles?: number;
  hint?: string;
  onFilesChange: (files: File[]) => void;
}

export default function DropZone({
  label,
  accept,
  maxFiles,
  hint,
  onFilesChange,
}: DropZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const updateFiles = useCallback(
    (next: File[]) => {
      setFiles(next);
      onFilesChange(next);
    },
    [onFilesChange],
  );

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming || incoming.length === 0) return;

      const newFiles = Array.from(incoming);
      const merged = [...files, ...newFiles];
      const capped = maxFiles ? merged.slice(0, maxFiles) : merged;

      updateFiles(capped);
    },
    [files, maxFiles, updateFiles],
  );

  const removeFile = useCallback(
    (index: number) => {
      const next = files.filter((_, i) => i !== index);
      updateFiles(next);
    },
    [files, updateFiles],
  );

  /* ── Drag handlers ─────────────────────────────────── */

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (dragCounter.current === 1) setIsDragging(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current = 0;
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  /* ── Click / input handler ─────────────────────────── */

  const handleClick = () => inputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = '';
  };

  /* ── Derived state ─────────────────────────────────── */

  const isAtLimit = maxFiles !== undefined && files.length >= maxFiles;

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <span className="text-sm font-medium text-white/80">{label}</span>

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={!isAtLimit ? handleClick : undefined}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isAtLimit) {
            e.preventDefault();
            handleClick();
          }
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={[
          'relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8',
          'transition-all duration-200',
          'focus-within:ring-2 focus-within:ring-[#7C5CFC]/50 focus:outline-none',
          isDragging
            ? 'border-[#7C5CFC]/60 bg-[#7C5CFC]/5'
            : 'border-white/20 bg-[#1A1A24] hover:border-[#7C5CFC]/60 hover:bg-[#7C5CFC]/5',
          isAtLimit ? 'cursor-default' : 'cursor-pointer',
        ].join(' ')}
      >
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={maxFiles === undefined || maxFiles > 1}
          onChange={handleInputChange}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />

        {/* Upload icon — cloud with up-arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          fill="none"
          className="h-10 w-10 text-[#7C5CFC]/70"
          aria-hidden="true"
        >
          <path
            d="M24 32V20m0 0-5 5m5-5 5 5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 32h-2a8 8 0 0 1-1.12-15.906A12 12 0 0 1 36 20a8 8 0 0 1 .8 15.96L34 36"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Prompt text */}
        <p className="text-sm text-[#8A8A99]">
          Drag&nbsp;&amp;&nbsp;drop or{' '}
          <span className="font-medium text-[#7C5CFC]">click to browse</span>
        </p>

        {/* Hint */}
        {hint && (
          <p className="text-xs text-[#8A8A99]/60">{hint}</p>
        )}

        {/* File counter */}
        {maxFiles !== undefined && (
          <p className="text-xs text-[#8A8A99]/60">
            {files.length}/{maxFiles} file{maxFiles !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Selected files list */}
      {files.length > 0 && (
        <ul className="flex flex-col gap-1.5 pt-1">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${file.lastModified}-${i}`}
              className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-white/70"
            >
              {/* File icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 shrink-0 text-[#7C5CFC]/60"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="min-w-0 flex-1 truncate">{file.name}</span>

              {/* Remove button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                aria-label={`Remove ${file.name}`}
                className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white/80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-3 w-3"
                  aria-hidden="true"
                >
                  <path d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06L8 9.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L9.06 8l3.72-3.72a.75.75 0 0 0-1.06-1.06L8 6.94 4.28 3.22z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
