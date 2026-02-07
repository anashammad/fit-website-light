import Image from 'next/image';
import { cn } from '@/lib/utils';
import { StatItem } from '@/components/molecules/StatItem';

export interface TrustStat {
  value: string;
  label: string;
}

export interface TrustLogo {
  name: string;
  src: string;
  href?: string;
}

export interface TrustBarProps {
  stats: TrustStat[];
  logos: TrustLogo[];
  className?: string;
}

export function TrustBar({ stats, logos, className }: TrustBarProps) {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section
      className={cn(
        'border-y border-terminal-border bg-surface py-12',
        className
      )}
    >
      <div className="container-content">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>

      {/* Client logos — infinite scrolling ticker */}
      {logos.length > 0 && (
        <>
          <div className="mt-10 mb-4 text-center">
            <span className="text-overline tracking-wider text-gray-500">TRUSTED BY</span>
          </div>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />

            <div className="flex animate-scroll-left">
              {duplicatedLogos.map((logo, i) => {
                const img = (
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={40}
                    className="h-10 w-auto shrink-0 object-contain opacity-60 transition-all hover:opacity-100"
                  />
                );

                if (logo.href) {
                  return (
                    <a
                      key={`${logo.name}-${i}`}
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={logo.name}
                      className="mx-10 flex shrink-0 items-center"
                    >
                      {img}
                    </a>
                  );
                }

                return (
                  <div key={`${logo.name}-${i}`} className="mx-10 flex shrink-0 items-center">
                    {img}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
