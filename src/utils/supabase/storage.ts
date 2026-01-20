import { createClient } from '@/lib/supabase/client';

export const STORAGE_BUCKETS = {
  VIDEOS: 'videos',
  COVERS: 'covers',
  AVATARS: 'avatars', // Optional
} as const;

export function getStorageUrl(bucket: string, path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path; // Already a full URL

  const supabase = createClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export function getVideoUrl(path: string): string {
  return getStorageUrl(STORAGE_BUCKETS.VIDEOS, path);
}

export function getCoverUrl(path: string): string {
  return getStorageUrl(STORAGE_BUCKETS.COVERS, path);
}
