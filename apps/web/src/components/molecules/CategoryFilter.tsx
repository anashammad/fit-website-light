'use client';

import { cn } from '@/lib/utils';

export interface CategoryOption {
  label: string;
  value: string;
}

export interface CategoryFilterProps {
  categories: CategoryOption[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CategoryFilter({ categories, active, onChange, className }: CategoryFilterProps) {
  return (
    <div className={cn('scrollbar-hide flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-x-visible', className)} role="tablist" aria-label="Filter by category">
      {categories.map((cat) => {
        const isActive = cat.value === active;
        return (
          <button
            key={cat.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.value)}
            className={cn(
              'min-h-[44px] flex-shrink-0 rounded-full px-4 py-2 text-body-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
