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
  return (
    <section
      className={cn(
        'border-y border-gray-200 bg-white py-12',
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

        {/* Client logos */}
        {logos.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-12 overflow-x-auto pb-2">
            {logos.map((logo) => {
              const img = (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={40}
                  className="h-10 w-auto shrink-0 object-contain grayscale opacity-50 transition-all hover:grayscale-0 hover:opacity-100"
                />
              );

              if (logo.href) {
                return (
                  <a
                    key={logo.name}
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={logo.name}
                  >
                    {img}
                  </a>
                );
              }

              return <div key={logo.name}>{img}</div>;
            })}
          </div>
        )}
      </div>
    </section>
  );
}
