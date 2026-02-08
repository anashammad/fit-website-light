import { cn } from '@/lib/utils';
import { Heading, Text, ButtonLink } from '@/components/atoms';

export interface CTABannerProps {
  heading: string;
  subtext?: string;
  buttonLabel: string;
  buttonHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTABanner({
  heading,
  subtext,
  buttonLabel,
  buttonHref,
  secondaryLabel,
  secondaryHref,
  className,
}: CTABannerProps) {
  return (
    <section className={cn('relative overflow-hidden bg-slate-50 py-20', className)}>
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 bg-terminal-grid opacity-100" aria-hidden="true" />

      {/* Accent glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 43, 127, 0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-content relative z-10 text-center">
        {/* Decorative line */}
        <div className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <Heading level={2} className="text-slate-900">
          {heading}
        </Heading>
        {subtext && (
          <Text variant="body-lg" className="mx-auto mt-4 max-w-xl text-slate-600">
            {subtext}
          </Text>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink
            variant="primary"
            size="lg"
            href={buttonHref}
          >
            {buttonLabel}
          </ButtonLink>
          {secondaryLabel && secondaryHref && (
            <ButtonLink
              variant="secondary"
              size="lg"
              href={secondaryHref}
            >
              {secondaryLabel}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
