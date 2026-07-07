import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2026-02-01';

export const isSanityConfigured = Boolean(projectId);

export const client = isSanityConfigured
  ? createClient({ projectId: projectId!, dataset, apiVersion, useCdn: true })
  : null;
