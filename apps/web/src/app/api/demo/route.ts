import { NextRequest, NextResponse } from 'next/server';
import { demoRequestSchema } from '@/lib/validation';
import { createFormSubmission } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const { success, remaining } = rateLimit(ip, 5, 15 * 60 * 1000);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': '900', 'X-RateLimit-Remaining': '0' },
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const result = demoRequestSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: result.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  try {
    await createFormSubmission({
      ...result.data,
      source: 'demo',
    });
  } catch (err) {
    console.error('Demo request submission failed:', err);
    return NextResponse.json(
      { error: 'Failed to submit request. Please try again.' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true },
    { headers: { 'X-RateLimit-Remaining': String(remaining) } }
  );
}
