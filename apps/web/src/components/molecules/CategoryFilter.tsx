'use client';

import { cn } from '@/lib/utils';

export interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
  className?: string;
}

export function CategoryFilter({ categories, active, onChange, className }: CategoryFilterProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)} role="tablist" aria-label="Filter by category">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={cn(
              'rounded-full px-4 py-2 text-body-sm font-medium transition-colors',
              isActive
                ? 'bg-accent text-primary'
                : 'bg-white/10 text-gray-300 hover:bg-white/15'
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
