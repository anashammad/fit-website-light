'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms';

const STORAGE_KEY = 'cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-slate-50/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-6 py-4 sm:flex-row sm:justify-between md:px-8 lg:px-12">
        <p className="text-body-sm text-slate-600">
          We use cookies to improve your experience and analyze site traffic. See our{' '}
          <Link href="/privacy-policy" className="text-primary underline hover:text-primary-light">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="ghost" size="sm" onClick={handleDecline}>
            Decline
          </Button>
          <Button variant="primary" size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
