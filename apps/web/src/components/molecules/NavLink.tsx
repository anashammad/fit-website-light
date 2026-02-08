'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface NavLinkChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavLinkProps {
  label: string;
  href?: string;
  dropdownItems?: NavLinkChild[];
  active?: boolean;
}

export function NavLink({ label, href, dropdownItems, active }: NavLinkProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [focusIndex, setFocusIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);

  const hasDropdown = dropdownItems && dropdownItems.length > 0;

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      setFocusIndex(-1);
    }, 150);
  }

  const closeDropdown = useCallback(() => {
    setOpen(false);
    setFocusIndex(-1);
  }, []);

  useEffect(() => {
    if (open && focusIndex >= 0 && menuRef.current) {
      const items = menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]');
      items[focusIndex]?.focus();
    }
  }, [open, focusIndex]);

  function handleButtonKeyDown(e: React.KeyboardEvent) {
    if (!hasDropdown) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setFocusIndex(0);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeDropdown();
    }
  }

  function handleMenuKeyDown(e: React.KeyboardEvent) {
    if (!dropdownItems) return;
    const len = dropdownItems.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusIndex((i) => (i + 1) % len);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusIndex((i) => (i - 1 + len) % len);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeDropdown();
    }
  }

  if (!hasDropdown) {
    return (
      <Link
        href={href ?? '#'}
        className={cn(
          'text-body-sm font-medium text-slate-600 transition-colors hover:text-slate-900',
          active && 'text-accent'
        )}
      >
        {label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className={cn(
          'inline-flex items-center gap-1 text-body-sm font-medium text-slate-600 transition-colors hover:text-slate-900',
          active && 'text-accent'
        )}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={handleButtonKeyDown}
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={cn('transition-transform duration-150', open && 'rotate-180')}
        >
          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-2 shadow-dropdown"
          style={{ minWidth: dropdownItems.length > 3 ? 480 : 240 }}
          role="menu"
          onKeyDown={handleMenuKeyDown}
        >
          <div className={cn(dropdownItems.length > 3 ? 'grid grid-cols-2 gap-1' : 'flex flex-col gap-1')}>
            {dropdownItems.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                tabIndex={-1}
                className="flex flex-col gap-0.5 rounded-lg px-3 py-2 transition-colors hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                <span className="text-body-sm font-semibold text-slate-800">
                  {child.label}
                </span>
                {child.description && (
                  <span className="text-caption text-slate-400">
                    {child.description}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
