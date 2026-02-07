import { Suspense } from 'react';
import { Spinner } from '@/components/atoms';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner size={32} />
        </div>
      }
    >
      <ContactForm />
    </Suspense>
  );
}
