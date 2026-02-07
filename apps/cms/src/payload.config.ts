import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';

import { BlogPosts } from './collections/BlogPosts';
import { JobListings } from './collections/JobListings';
import { Pages } from './collections/Pages';
import { Media } from './collections/Media';
import { Resumes } from './collections/Resumes';
import { FormSubmissions } from './collections/FormSubmissions';
import { Categories } from './collections/Categories';
import { TeamMembers } from './collections/TeamMembers';
import { Users } from './collections/Users';

import { SiteSettings } from './globals/SiteSettings';
import { Navigation } from './globals/Navigation';
import { Footer } from './globals/Footer';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  secret: (() => {
    const secret = process.env.PAYLOAD_SECRET;
    if (!secret && process.env.NODE_ENV === 'production') {
      throw new Error('PAYLOAD_SECRET is required in production');
    }
    return secret || 'dev-secret-change-in-production';
  })(),

  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— FIT CMS',
    },
  },

  editor: lexicalEditor({}),

  db: postgresAdapter({
    pool: {
      connectionString: (() => {
        const uri = process.env.DATABASE_URI;
        if (!uri && process.env.NODE_ENV === 'production') {
          throw new Error('DATABASE_URI is required in production');
        }
        return uri || 'postgresql://fit:fit@localhost:5432/fit_dev';
      })(),
    },
  }),

  collections: [
    BlogPosts,
    JobListings,
    Pages,
    Media,
    Resumes,
    FormSubmissions,
    Categories,
    TeamMembers,
    Users,
  ],

  globals: [SiteSettings, Navigation, Footer],

  cors: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.FRONTEND_STAGING_URL || '',
  ].filter(Boolean),

  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.FRONTEND_STAGING_URL || '',
  ].filter(Boolean),

  plugins: [
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: { prefix: 'media' },
              resumes: { prefix: 'resumes' },
            },
            bucket: process.env.S3_BUCKET,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY || '',
                secretAccessKey: process.env.S3_SECRET_KEY || '',
              },
              region: process.env.S3_REGION || 'me-south-1',
              ...(process.env.S3_ENDPOINT
                ? { endpoint: process.env.S3_ENDPOINT }
                : {}),
            },
          }),
        ]
      : []),
  ],

  typescript: {
    outputFile: './src/payload-types.ts',
  },
});
