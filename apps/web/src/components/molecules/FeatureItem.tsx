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
    <div className={cn('flex flex-col rounded-lg border border-terminal-border bg-surface p-6 transition-all duration-300 hover:border-accent/15', className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded border border-terminal-border bg-surface-light">
        <Icon name={icon} size={24} className="text-accent" />
      </div>
      <Heading level={4} className="mt-4 text-white">
        {title}
      </Heading>
      <Text variant="body-sm" className="mt-2 text-gray-400">
        {description}
      </Text>
    </div>
  );
}
