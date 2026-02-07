import { cn } from '@/lib/utils';
import { Heading, Text } from '@/components/atoms';
import { FeatureItem } from '@/components/molecules/FeatureItem';

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  overline?: string;
  heading: string;
  features: Feature[];
  className?: string;
}

export function FeatureGrid({ overline, heading, features, className }: FeatureGridProps) {
  return (
    <section className={cn('section-padding bg-primary', className)}>
      <div className="container-content">
        {overline && (
          <Text variant="overline" className="text-accent">
            {overline}
          </Text>
        )}
        <Heading level={2} className="mt-2 text-white">
          {heading}
        </Heading>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureItem
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
