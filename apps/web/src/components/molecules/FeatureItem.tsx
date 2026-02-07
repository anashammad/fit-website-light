import { cn } from '@/lib/utils';
import { Icon, Heading, Text } from '@/components/atoms';

export interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export function FeatureItem({ icon, title, description, className }: FeatureItemProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <Icon name={icon} size={40} className="text-secondary" />
      <Heading level={4} className="mt-4">
        {title}
      </Heading>
      <Text variant="body-sm" className="mt-2">
        {description}
      </Text>
    </div>
  );
}
