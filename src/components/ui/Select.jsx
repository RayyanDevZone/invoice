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
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef(null);
  const searchRef = useRef(null);

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
    const handleClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    searchRef.current?.focus();
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`} ref={rootRef}>
      {label && <label className="text-sm font-medium text-gray-600">{label}</label>}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-semibold text-left focus:outline-none focus:border-brand-dark focus:ring-2 focus:ring-brand/30 disabled:opacity-50 disabled:cursor-not-allowed transition-shadow"
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
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  className="w-full text-sm focus:outline-none placeholder:text-gray-400 placeholder:font-normal font-semibold text-gray-900"
                />
              </div>
            )}
            <ul className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-sm text-gray-400">No results</li>
              )}
              {filtered.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(option.value);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center justify-between gap-2 text-left px-3 py-2 text-sm transition-colors ${
                        isSelected ? 'bg-brand/15 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50 font-medium'
                      }`}
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
    </div>
  );
};

export default Select;
