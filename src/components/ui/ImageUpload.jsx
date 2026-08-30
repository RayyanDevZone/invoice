import React, { useRef, useState } from 'react';
import { LuImagePlus, LuX, LuPencil, LuLoader } from 'react-icons/lu';

// A shadcn/ui-styled dropzone: click-or-drag upload, a real read-progress bar
// (FileReader's own onprogress, not a fake timer), a preview once loaded, and
// hover controls to replace or remove the file.
const ImageUpload = ({ label, value, onChange, hint, accept = 'image/*', className = '', height = 'h-32', width = 'w-40' }) => {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(null); // null = idle, 0-100 while reading
  const [dragOver, setDragOver] = useState(false);
  const isUploading = progress !== null;

  const readFile = (file) => {
    if (!file) return;
    setProgress(0);
    const reader = new FileReader();
    reader.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
    };
    reader.onload = (e) => {
      setProgress(100);
      window.setTimeout(() => {
        setProgress(null);
        onChange(e.target.result);
      }, 200);
    };
    reader.onerror = () => setProgress(null);
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    readFile(e.target.files[0]);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (!isUploading) readFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-600">{label}</label>}
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleInputChange} />

      {value && !isUploading ? (
        <div className={`relative ${height} ${width} rounded-lg border border-gray-200 bg-gray-50 overflow-hidden group`}>
          <img src={value} alt={label || 'Uploaded'} className="w-full h-full object-contain p-2" />
          <div className="absolute inset-0 flex items-start justify-end gap-1.5 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              aria-label="Replace image"
              className="h-6 w-6 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
            >
              <LuPencil className="text-xs" />
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              aria-label="Remove image"
              className="h-6 w-6 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors"
            >
              <LuX className="text-xs" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => !isUploading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`${height} ${width} rounded-lg border border-dashed flex flex-col items-center justify-center gap-1.5 text-center px-3 transition-colors ${
            dragOver ? 'border-brand-dark bg-brand/10' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          } disabled:opacity-60`}
        >
          {isUploading ? (
            <div className="w-full flex flex-col items-center gap-2">
              <LuLoader className="text-xl text-gray-400 animate-spin" />
              <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-brand-dark rounded-full transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-500">{progress}%</span>
            </div>
          ) : (
            <>
              <LuImagePlus className="text-2xl text-gray-400" />
              <span className="text-sm font-semibold text-gray-600">Click or drag to upload</span>
              {hint && <span className="text-xs text-gray-400">{hint}</span>}
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
