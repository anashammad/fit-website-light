'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/atoms';
import type { NavItem } from './Header';

export interface MobileNavProps {
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ items, ctaLabel, ctaHref, open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Focus trap, Escape key, and focus restoration
  useEffect(() => {
    if (!open) return;

    triggerRef.current = document.activeElement as HTMLElement;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={cn(
        'fixed inset-0 z-50 lg:hidden',
        open ? 'visible' : 'invisible'
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/30 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={cn(
          'absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white border-l border-slate-200 shadow-modal transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Close button */}
        <div className="flex h-16 items-center justify-end px-6">
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded text-slate-500 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label="Close navigation menu"
            onClick={onClose}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-6" aria-label="Mobile navigation">
          {items.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedIndex === index;

            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  href={item.href ?? '#'}
                  className="flex h-14 items-center text-h4 text-slate-700 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.label}>
                <button
                  type="button"
                  className="flex h-14 w-full items-center justify-between text-h4 text-slate-700 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  aria-expanded={isExpanded}
                >
                  {item.label}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className={cn('transition-transform duration-150', isExpanded && 'rotate-180')}
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isExpanded && (
                  <div className="pb-2 pl-4">
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex h-11 items-center text-body-sm text-slate-500 hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40"
                        onClick={onClose}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="p-6">
          <ButtonLink variant="primary" size="lg" className="w-full" href={ctaHref} onClick={onClose}>
            {ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
