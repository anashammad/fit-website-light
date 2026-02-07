import { NextRequest, NextResponse } from 'next/server';
import { applicationSchema } from '@/lib/validation';
import { createFormSubmission, uploadResume } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

const MAX_RESUME_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

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

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: 'Invalid form data.' },
      { status: 400 }
    );
  }

  // Extract text fields
  const fields = {
    name: formData.get('name') as string | null,
    email: formData.get('email') as string | null,
    phone: formData.get('phone') as string | null,
    coverLetter: formData.get('coverLetter') as string | null,
    linkedinUrl: formData.get('linkedinUrl') as string | null,
    jobSlug: formData.get('jobSlug') as string | null,
  };

  const result = applicationSchema.safeParse({
    name: fields.name ?? '',
    email: fields.email ?? '',
    phone: fields.phone ?? undefined,
    coverLetter: fields.coverLetter ?? undefined,
    linkedinUrl: fields.linkedinUrl ?? undefined,
    jobSlug: fields.jobSlug ?? '',
  });

  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: result.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Validate resume file
  const resumeFile = formData.get('resume') as File | null;

  if (!resumeFile || !(resumeFile instanceof File) || resumeFile.size === 0) {
    return NextResponse.json(
      { error: 'Resume file is required.' },
      { status: 422 }
    );
  }

  if (!ALLOWED_RESUME_TYPES.includes(resumeFile.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Please upload a PDF or Word document.' },
      { status: 422 }
    );
  }

  if (resumeFile.size > MAX_RESUME_SIZE) {
    return NextResponse.json(
      { error: 'File too large. Maximum size is 10 MB.' },
      { status: 422 }
    );
  }

  try {
    // Upload resume to Payload CMS (stored in S3)
    const resumeId = await uploadResume(resumeFile, result.data.name);

    // Create form submission with resume reference
    await createFormSubmission({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      coverLetter: result.data.coverLetter,
      linkedinUrl: result.data.linkedinUrl,
      source: 'application',
      jobListing: result.data.jobSlug,
      resume: resumeId,
    });
  } catch (err) {
    console.error('Job application submission failed:', err);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true },
    { headers: { 'X-RateLimit-Remaining': String(remaining) } }
  );
}
