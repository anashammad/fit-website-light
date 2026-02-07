import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Heading, Text, ButtonLink } from '@/components/atoms';
import { Breadcrumb, type BreadcrumbItem } from '@/components/molecules/Breadcrumb';

export type HeroVariant = 'primary' | 'page' | 'light';

export interface HeroCTA {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export interface HeroSectionProps {
  variant?: HeroVariant;
  overline?: string;
  title: string;
  subtitle?: string;
  ctas?: HeroCTA[];
  breadcrumbs?: BreadcrumbItem[];
  image?: string;
  imageAlt?: string;
  className?: string;
}

export function HeroSection({
  variant = 'primary',
  overline,
  title,
  subtitle,
  ctas,
  breadcrumbs,
  image,
  imageAlt = '',
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        variant === 'primary' && 'bg-primary pb-28 pt-36',
        variant === 'page' && 'bg-primary pb-20 pt-24',
        variant === 'light' && 'bg-surface py-16',
        className
      )}
    >
      {/* Background grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-terminal-grid opacity-100" aria-hidden="true" />

      {/* Radial glow */}
      {variant === 'primary' && (
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/4"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212, 168, 67, 0.06) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Decorative candlestick chart SVG */}
      {variant === 'primary' && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 opacity-[0.04]" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1200 128" preserveAspectRatio="none" fill="none">
            {/* Candlestick-inspired abstract pattern */}
            <line x1="50" y1="20" x2="50" y2="110" stroke="#D4A843" strokeWidth="1" />
            <rect x="44" y="40" width="12" height="40" fill="#00C853" />
            <line x1="120" y1="10" x2="120" y2="120" stroke="#D4A843" strokeWidth="1" />
            <rect x="114" y="30" width="12" height="50" fill="#FF1744" />
            <line x1="190" y1="25" x2="190" y2="100" stroke="#D4A843" strokeWidth="1" />
            <rect x="184" y="45" width="12" height="30" fill="#00C853" />
            <line x1="260" y1="15" x2="260" y2="115" stroke="#D4A843" strokeWidth="1" />
            <rect x="254" y="35" width="12" height="45" fill="#00C853" />
            <line x1="330" y1="30" x2="330" y2="105" stroke="#D4A843" strokeWidth="1" />
            <rect x="324" y="50" width="12" height="35" fill="#FF1744" />
            <line x1="400" y1="20" x2="400" y2="95" stroke="#D4A843" strokeWidth="1" />
            <rect x="394" y="35" width="12" height="40" fill="#00C853" />
            <line x1="470" y1="10" x2="470" y2="110" stroke="#D4A843" strokeWidth="1" />
            <rect x="464" y="25" width="12" height="55" fill="#FF1744" />
            <line x1="540" y1="30" x2="540" y2="100" stroke="#D4A843" strokeWidth="1" />
            <rect x="534" y="40" width="12" height="35" fill="#00C853" />
            <line x1="610" y1="15" x2="610" y2="105" stroke="#D4A843" strokeWidth="1" />
            <rect x="604" y="30" width="12" height="50" fill="#00C853" />
            <line x1="680" y1="25" x2="680" y2="115" stroke="#D4A843" strokeWidth="1" />
            <rect x="674" y="45" width="12" height="40" fill="#FF1744" />
            <line x1="750" y1="20" x2="750" y2="100" stroke="#D4A843" strokeWidth="1" />
            <rect x="744" y="35" width="12" height="35" fill="#00C853" />
            <line x1="820" y1="10" x2="820" y2="110" stroke="#D4A843" strokeWidth="1" />
            <rect x="814" y="25" width="12" height="60" fill="#00C853" />
            <line x1="890" y1="35" x2="890" y2="105" stroke="#D4A843" strokeWidth="1" />
            <rect x="884" y="50" width="12" height="30" fill="#FF1744" />
            <line x1="960" y1="15" x2="960" y2="95" stroke="#D4A843" strokeWidth="1" />
            <rect x="954" y="30" width="12" height="40" fill="#00C853" />
            <line x1="1030" y1="20" x2="1030" y2="110" stroke="#D4A843" strokeWidth="1" />
            <rect x="1024" y="40" width="12" height="45" fill="#FF1744" />
            <line x1="1100" y1="25" x2="1100" y2="100" stroke="#D4A843" strokeWidth="1" />
            <rect x="1094" y="35" width="12" height="35" fill="#00C853" />
            <line x1="1170" y1="10" x2="1170" y2="120" stroke="#D4A843" strokeWidth="1" />
            <rect x="1164" y="20" width="12" height="55" fill="#00C853" />
          </svg>
        </div>
      )}

      <div className="container-content relative z-10">
        {breadcrumbs && (
          <Breadcrumb
            items={breadcrumbs}
            className="[&_span]:text-gray-500 [&_a]:text-gray-500 [&_a:hover]:text-accent"
          />
        )}

        <div
          className={cn(
            'flex flex-col',
            variant === 'primary' && 'items-center gap-12 text-center lg:flex-row lg:text-left',
            variant === 'page' && 'max-w-3xl',
            variant === 'light' && 'max-w-3xl'
          )}
        >
          {/* Text content */}
          <div className={cn(variant === 'primary' && image && 'lg:w-7/12')}>
            {overline && (
              <Text
                variant="overline"
                as="span"
                className="text-accent"
              >
                {overline}
              </Text>
            )}
            <Heading
              level={1}
              className={cn(
                'mt-3',
                variant === 'primary' && 'text-display text-white md:text-display',
                variant === 'page' && 'text-white',
                variant === 'light' && 'text-white'
              )}
            >
              {title}
            </Heading>
            {subtitle && (
              <Text
                variant="body-lg"
                className="mt-5 text-gray-400"
              >
                {subtitle}
              </Text>
            )}
            {ctas && ctas.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-4">
                {ctas.map((cta) => (
                  <ButtonLink
                    key={cta.label}
                    variant={cta.variant ?? 'primary'}
                    size="md"
                    href={cta.href}
                  >
                    {cta.label}
                  </ButtonLink>
                ))}
              </div>
            )}
          </div>

          {/* Optional hero image */}
          {variant === 'primary' && image && (
            <div className="hidden max-w-[480px] lg:block lg:w-5/12">
              <Image
                src={image}
                alt={imageAlt}
                width={480}
                height={360}
                className="h-auto w-full rounded-lg"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Decorative market ticker tape */}
      {variant === 'primary' && (
        <div className="relative z-10 mt-8 overflow-hidden border-t border-terminal-border/30 bg-primary-dark/50 py-2" aria-hidden="true">
          <div className="flex animate-market-ticker whitespace-nowrap font-mono text-ticker">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-6 px-4">
                <span className="text-terminal-green">MSM 30 ▲ 1.2%</span>
                <span className="text-terminal-border">|</span>
                <span className="text-terminal-green">ADX ▲ 0.8%</span>
                <span className="text-terminal-border">|</span>
                <span className="text-terminal-red">DFM ▼ 0.3%</span>
                <span className="text-terminal-border">|</span>
                <span className="text-terminal-green">QSE ▲ 0.5%</span>
                <span className="text-terminal-border">|</span>
                <span className="text-terminal-green">TASI ▲ 1.1%</span>
                <span className="text-terminal-border">|</span>
                <span className="text-terminal-red">BSE ▼ 0.2%</span>
                <span className="text-terminal-border">|</span>
                <span className="text-terminal-green">KSE ▲ 0.6%</span>
                <span className="text-terminal-border">|</span>
                <span className="text-terminal-green">NASDAQ ▲ 0.9%</span>
                <span className="text-terminal-border">|</span>
                <span className="text-terminal-red">FTSE ▼ 0.1%</span>
                <span className="text-terminal-border">|</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
