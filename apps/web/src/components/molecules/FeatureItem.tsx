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
    <div className={cn('flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:border-primary/15 hover:shadow-card-hover', className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 bg-slate-50">
        <Icon name={icon} size={24} className="text-primary" />
      </div>
      <Heading level={4} className="mt-4 text-slate-900">
        {title}
      </Heading>
      <Text variant="body-sm" className="mt-2 text-slate-500">
        {description}
      </Text>
    </div>
  );
}
