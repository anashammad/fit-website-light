import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

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

  const result = newsletterSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: result.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Email service integration pending — currently logs for future provider hookup
  console.log('Newsletter signup:', result.data.email);

  return NextResponse.json(
    { success: true },
    { headers: { 'X-RateLimit-Remaining': String(remaining) } }
  );
}
