import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LuChevronDown, LuCheck, LuSearch } from 'react-icons/lu';

// A small shadcn/ui-style combobox: bordered trigger button + popover listbox,
// with an optional search box for long option lists.
const Select = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select…',
  searchable = true,
  disabled = false,
  error,
  onClose,
  name,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  // Option highlighted by the arrow keys (or the mouse), as an index into `filtered`.
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const searchRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);

  const selected = options.find((o) => o.value === value);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter(
      (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  }, [options, query]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    const close = () => {
      setOpen(false);
      onClose?.();
    };
    const handleClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close();
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
    searchRef.current?.focus();
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Keep the highlighted option in view while arrowing through a long list.
  useEffect(() => {
    if (open) listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  const choose = (option) => {
    onChange(option.value);
    setOpen(false);
    onClose?.();
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (filtered.length === 0) return;
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((i) => (i + step + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIndex]) choose(filtered[activeIndex]);
    } else if (e.key === 'Tab') {
      setOpen(false);
      onClose?.();
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`} ref={rootRef} onKeyDown={handleKeyDown}>
      {label && <label className="text-sm font-medium text-gray-600">{label}</label>}
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          data-field={name}
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          aria-invalid={error ? true : undefined}
          className={`w-full flex items-center justify-between gap-2 bg-white border rounded-lg ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-brand/30'} px-3 py-2.5 text-sm font-semibold text-left focus:outline-none focus:border-brand-dark focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-shadow`}
        >
          <span className={selected ? 'text-gray-900 truncate' : 'text-gray-400 font-normal truncate'}>
            {selected ? selected.label : placeholder}
          </span>
          <LuChevronDown className={`text-gray-400 text-base shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute z-50 mt-1.5 w-full rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
            {searchable && (
              <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                <LuSearch className="text-gray-400 text-sm shrink-0" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  placeholder="Search…"
                  className="w-full text-sm focus:outline-none placeholder:text-gray-400 placeholder:font-normal font-semibold text-gray-900"
                />
              </div>
            )}
            <ul ref={listRef} role="listbox" className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-sm text-gray-400">No results</li>
              )}
              {filtered.map((option, index) => {
                const isSelected = option.value === value;
                const isActive = index === activeIndex;
                return (
                  <li key={option.value} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => choose(option)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`w-full flex items-center justify-between gap-2 text-left px-3 py-2 text-sm transition-colors ${
                        isSelected ? 'text-gray-900 font-semibold' : 'text-gray-700 font-medium'
                      } ${isActive ? (isSelected ? 'bg-brand/25' : 'bg-gray-100') : isSelected ? 'bg-brand/15' : ''}`}
                    >
                      <span className="truncate">{option.label}</span>
                      {isSelected && <LuCheck className="text-brand-dark text-sm shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
