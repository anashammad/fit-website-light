import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let body: { secret?: string; collection?: string; slug?: string; path?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const { secret, collection, slug, path } = body;

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret.' },
      { status: 401 }
    );
  }

  const revalidated: string[] = [];

  // Revalidate collection tag (invalidates list pages)
  if (collection) {
    revalidateTag(collection);
    revalidated.push(`tag:${collection}`);
  }

  // Revalidate specific path if provided
  if (path) {
    revalidatePath(path);
    revalidated.push(`path:${path}`);
  }

  // Auto-derive paths for known collections
  if (collection && slug && !path) {
    const pathMap: Record<string, { list: string; detail?: string }> = {
      'blog-posts': { list: `/blog`, detail: `/blog/${slug}` },
      'job-listings': { list: `/careers`, detail: `/careers/${slug}` },
      'team-members': { list: `/about/leadership` },
      pages: { list: `/`, detail: `/${slug}` },
    };

    const entry = pathMap[collection];
    if (entry) {
      revalidatePath(entry.list);
      revalidated.push(`path:${entry.list}`);
      if (entry.detail) {
        revalidatePath(entry.detail);
        revalidated.push(`path:${entry.detail}`);
      }
    }
  }

  return NextResponse.json({
    revalidated: true,
    paths: revalidated,
    now: Date.now(),
  });
}
