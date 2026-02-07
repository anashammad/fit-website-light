import Image from 'next/image';
import { Heading, Text, ButtonLink } from '@/components/atoms';

export interface PlatformPreviewProps {
  productName: string;
  screenshots?: { src: string; alt: string }[];
  demoHref?: string;
}

export function PlatformPreview({ productName, screenshots, demoHref = '/contact?type=demo' }: PlatformPreviewProps) {
  const hasScreenshots = screenshots && screenshots.length > 0;

  return (
    <section className="section-padding bg-surface">
      <div className="container-content">
        <Text variant="overline" className="text-accent">
          Platform Preview
        </Text>
        <Heading level={2} className="mt-2 text-white">
          See {productName} in Action
        </Heading>
        <Text variant="body-lg" className="mt-4 max-w-2xl text-gray-400">
          Get a feel for the interface your traders will use every day.
        </Text>

        {hasScreenshots ? (
          <div className={`mt-10 grid gap-6 ${screenshots.length === 1 ? 'grid-cols-1' : screenshots.length === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'}`}>
            {screenshots.map((shot, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-terminal-border bg-primary"
              >
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-terminal-border bg-primary px-4 py-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-terminal-red/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-terminal-green/60" />
                  </div>
                  <span className="ml-2 font-mono text-caption text-gray-500">{shot.alt}</span>
                </div>

                {/* Screenshot */}
                <div className="relative">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1200}
                    height={800}
                    className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Fallback: mock terminal when no screenshots */
          <div className="mt-10 overflow-hidden rounded-lg border border-terminal-border bg-primary">
            <div className="flex items-center gap-2 border-b border-terminal-border px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-terminal-red/60" />
                <div className="h-3 w-3 rounded-full bg-accent/60" />
                <div className="h-3 w-3 rounded-full bg-terminal-green/60" />
              </div>
              <span className="ml-3 font-mono text-caption text-gray-500">{productName}</span>
            </div>
            <div className="relative flex min-h-[300px] items-center justify-center bg-terminal-grid">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
                    <polygon points="5,3 19,12 5,21" fill="currentColor" />
                  </svg>
                </div>
                <Text variant="body-lg" className="font-semibold text-white">
                  Live platform demo available on request
                </Text>
                <Text variant="body-sm" className="mt-1 text-gray-400">
                  See the full {productName} interface with your data
                </Text>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <ButtonLink variant="primary" href={demoHref}>
            Request a Live Demo
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
