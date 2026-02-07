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
    <section className={cn('bg-secondary py-16', className)}>
      <div className="container-content text-center">
        <Heading level={2} className="text-white">
          {heading}
        </Heading>
        {subtext && (
          <Text variant="body-lg" className="mx-auto mt-4 max-w-xl text-white/80">
            {subtext}
          </Text>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink
            variant="secondary"
            size="lg"
            className="border-white bg-white text-secondary hover:bg-gray-50 hover:text-secondary-hover"
            href={buttonHref}
          >
            {buttonLabel}
          </ButtonLink>
          {secondaryLabel && secondaryHref && (
            <ButtonLink
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white/10"
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
