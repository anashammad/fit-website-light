import type { CollectionAfterChangeHook } from 'payload';
import { Resend } from 'resend';

export const sendNotificationEmail: CollectionAfterChangeHook = async ({
  doc,
  operation,
}) => {
  if (operation !== 'create') return doc;

  const apiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!apiKey || !notificationEmail) {
    console.warn('Email not configured. Skipping notification.');
    return doc;
  }

  const resend = new Resend(apiKey);

  const sourceLabels: Record<string, string> = {
    contact: 'Contact Form',
    demo: 'Demo Request',
    application: 'Job Application',
  };

  const subject = `New ${sourceLabels[doc.source] || 'Form'} Submission from ${doc.name}`;

  const lines = [
    `Name: ${doc.name}`,
    `Email: ${doc.email}`,
    doc.company ? `Company: ${doc.company}` : null,
    doc.phone ? `Phone: ${doc.phone}` : null,
    doc.productInterest ? `Product Interest: ${doc.productInterest}` : null,
    doc.companySize ? `Company Size: ${doc.companySize}` : null,
    doc.message ? `\nMessage:\n${doc.message}` : null,
    doc.linkedinUrl ? `LinkedIn: ${doc.linkedinUrl}` : null,
    doc.coverLetter ? `\nCover Letter:\n${doc.coverLetter}` : null,
  ].filter(Boolean);

  try {
    await resend.emails.send({
      from: 'FIT Website <noreply@fitoman.com>',
      to: notificationEmail,
      subject,
      text: lines.join('\n'),
    });
  } catch (err) {
    console.error('Failed to send notification email:', err);
  }

  return doc;
};
