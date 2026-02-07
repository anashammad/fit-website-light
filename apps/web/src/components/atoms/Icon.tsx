import { cn } from '@/lib/utils';

export type IconSize = 16 | 20 | 24 | 40 | 48;

export interface IconProps {
  name: string;
  size?: IconSize;
  className?: string;
  label?: string;
}

/**
 * Generic icon wrapper. Renders an inline SVG sprite reference.
 * Icons are expected at /images/icons/{name}.svg or as a sprite sheet.
 *
 * For the initial build, this uses a simple img-based approach.
 * Can be swapped to an SVG sprite or icon library (e.g., lucide-react) later.
 */
export function Icon({ name, size = 24, className, label }: IconProps) {
  const isDecorative = !label;

  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center', className)}
      style={{ width: size, height: size }}
      role={isDecorative ? 'presentation' : 'img'}
      aria-label={label}
      aria-hidden={isDecorative}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/icons/${name}.svg`}
        alt=""
        width={size}
        height={size}
        className="h-full w-full"
      />
    </span>
  );
}
