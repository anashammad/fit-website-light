'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Logo, ButtonLink } from '@/components/atoms';
import { NavLink, type NavLinkChild } from '@/components/molecules/NavLink';
import { MobileNav } from './MobileNav';

export interface NavItem {
  label: string;
  href?: string;
  children?: NavLinkChild[];
}

export interface HeaderProps {
  items: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function Header({
  items,
  ctaLabel = 'Request Demo',
  ctaHref = '/contact',
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all duration-150',
        scrolled && 'shadow-nav'
      )}
    >
      <div className="container-content flex h-full items-center justify-between">
        <Logo variant="dark" />

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {items.map((item) => (
            <NavLink
              key={item.label}
              label={item.label}
              href={item.href}
              dropdownItems={item.children}
            />
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink variant="primary" size="sm" href={ctaHref}>
            {ctaLabel}
          </ButtonLink>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded text-slate-500 hover:text-slate-900 lg:hidden"
          aria-label="Open navigation menu"
          onClick={() => setMobileOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <MobileNav
        items={items}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
