// Shared constants used across web and CMS apps.

export const PRODUCTS = [
  { slug: 'fit-premium', name: 'FIT Premium (OMS)' },
  { slug: 'api-middleware', name: 'API Middleware' },
  { slug: 'wasata-backoffice', name: 'Wasata Backoffice' },
  { slug: 'order-surveillance', name: 'Order Surveillance' },
  { slug: 'mobile-web-trading', name: 'Mobile & Web Trading' },
] as const;

export const SOLUTIONS = [
  { slug: 'brokerage', name: 'For Brokerage Houses' },
  { slug: 'exchanges', name: 'For Exchanges' },
  { slug: 'banks', name: 'For Banks' },
  { slug: 'regulators', name: 'For Regulators' },
] as const;

export const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Sales',
  'Operations',
  'Support',
  'Management',
] as const;

export const JOB_TYPES = ['full-time', 'part-time', 'contract'] as const;

export const PRODUCT_INTERESTS = [
  'FIT Premium',
  'API Middleware',
  'Wasata Backoffice',
  'Order Surveillance',
  'Mobile & Web Trading',
  'Other',
] as const;
