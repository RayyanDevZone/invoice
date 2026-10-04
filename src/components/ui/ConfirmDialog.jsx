import React, { useEffect, useRef } from 'react';
import Button from './Button';

// A small modal asking the user to confirm an action.
const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  icon: Icon,
  tone = 'default',
  busy = false,
  onConfirm,
  onCancel,
}) => {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape' && !busy) onCancel();
    };
    document.addEventListener('keydown', handleKey);
    cancelRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, busy, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busy) onCancel();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-xl font-google-sans"
      >
        {Icon && (
          <span className={`h-10 w-10 rounded-full flex items-center justify-center mb-4 ${tone === 'danger' ? 'bg-red-50' : 'bg-gray-100'}`}>
            <Icon className={`text-lg ${tone === 'danger' ? 'text-red-600' : 'text-gray-700'}`} />
          </span>
        )}
        <h2 id="confirm-dialog-title" className="text-lg font-bold text-gray-900">
          {title}
        </h2>
        <p id="confirm-dialog-message" className="text-sm text-gray-500 mt-1">
          {message}
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <Button ref={cancelRef} type="button" variant="secondary" onClick={onCancel} disabled={busy}>
            {cancelLabel}
          </Button>
          <Button type="button" variant={tone === 'danger' ? 'danger' : 'primary'} onClick={onConfirm} disabled={busy}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
