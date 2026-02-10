import nodemailer from 'nodemailer';

const GMAIL_USER = process.env.GMAIL_USER || 'fit.mena.dev@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || '';
const NOTIFICATION_RECIPIENTS = (
  process.env.NOTIFICATION_RECIPIENTS ||
  'a.hammad@fitmena.com'
).split(',');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

interface FormSubmissionData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  productInterest?: string;
  product?: string;
  companySize?: string;
  useCase?: string;
  coverLetter?: string;
  linkedinUrl?: string;
  source: 'contact' | 'demo' | 'application';
  jobListing?: string;
  resume?: string;
}

function buildEmailHtml(data: FormSubmissionData): string {
  const sourceLabel =
    data.source === 'demo'
      ? 'Demo Request'
      : data.source === 'application'
        ? 'Job Application'
        : 'Contact Form';

  const rows: [string, string | undefined][] = [
    ['Name', data.name],
    ['Email', data.email],
    ['Company', data.company],
    ['Phone', data.phone],
    ['Product Interest', data.product || data.productInterest],
    ['Company Size', data.companySize],
    ['Use Case', data.useCase],
    ['Message', data.message],
    ['Cover Letter', data.coverLetter],
    ['LinkedIn', data.linkedinUrl],
    ['Job Listing', data.jobListing],
  ];

  const tableRows = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 12px;font-weight:600;vertical-align:top;border-bottom:1px solid #eee;color:#334155;width:160px">${label}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#475569">${value!.replace(/\n/g, '<br/>')}</td>
        </tr>`
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#002B7F;padding:20px 24px;border-radius:8px 8px 0 0">
        <h2 style="color:#fff;margin:0;font-size:18px">New ${sourceLabel} - FIT Website</h2>
      </div>
      <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;padding:4px 0">
        <table style="width:100%;border-collapse:collapse">
          ${tableRows}
        </table>
      </div>
      <p style="color:#94a3b8;font-size:12px;margin-top:16px;text-align:center">
        Sent from www.fitoman.com
      </p>
    </div>
  `;
}

export async function createFormSubmission(
  data: FormSubmissionData
): Promise<{ id: string }> {
  const sourceLabel =
    data.source === 'demo'
      ? 'Demo Request'
      : data.source === 'application'
        ? 'Job Application'
        : 'Contact Inquiry';

  await transporter.sendMail({
    from: `"FIT Website" <${GMAIL_USER}>`,
    to: NOTIFICATION_RECIPIENTS,
    replyTo: data.email,
    subject: `[FIT] ${sourceLabel} from ${data.name}${data.company ? ` (${data.company})` : ''}`,
    html: buildEmailHtml(data),
  });

  return { id: Date.now().toString() };
}

export async function uploadResume(
  file: File,
  applicantName: string
): Promise<string> {
  // Resume upload not available without CMS — return placeholder
  console.warn('Resume upload called without CMS backend:', applicantName, file.name);
  return 'no-cms-upload';
}
