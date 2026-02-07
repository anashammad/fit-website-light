import { getGlobal } from './payload';
import type { SiteSettings, Navigation, Footer } from '@/types/payload';

export async function getSiteSettings(): Promise<SiteSettings> {
  return getGlobal<SiteSettings>('site-settings', {
    tags: ['site-settings'],
  });
}

export async function getNavigation(): Promise<Navigation> {
  return getGlobal<Navigation>('navigation', {
    tags: ['navigation'],
  });
}

export async function getFooter(): Promise<Footer> {
  return getGlobal<Footer>('footer', {
    tags: ['footer'],
  });
}
