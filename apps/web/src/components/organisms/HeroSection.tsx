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
  const isDark = variant !== 'light';

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        variant === 'primary' && 'bg-primary pb-24 pt-32',
        variant === 'page' && 'bg-primary pb-16 pt-20',
        variant === 'light' && 'bg-gray-50 py-12',
        className
      )}
    >
      <div className="container-content">
        {breadcrumbs && (
          <Breadcrumb
            items={breadcrumbs}
            className={isDark ? '[&_span]:text-gray-400 [&_a]:text-gray-400 [&_a:hover]:text-white' : ''}
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
                className={cn(isDark ? 'text-gray-400' : 'text-gray-500')}
              >
                {overline}
              </Text>
            )}
            <Heading
              level={1}
              className={cn(
                'mt-2',
                variant === 'primary' && 'text-display text-white md:text-display',
                variant === 'page' && 'text-white',
                variant === 'light' && 'text-gray-900'
              )}
            >
              {title}
            </Heading>
            {subtitle && (
              <Text
                variant="body-lg"
                className={cn(
                  'mt-4',
                  isDark ? 'text-gray-300' : 'text-gray-500'
                )}
              >
                {subtitle}
              </Text>
            )}
            {ctas && ctas.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
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
                className="h-auto w-full"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
