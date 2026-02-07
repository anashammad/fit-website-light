const PAYLOAD_URL = process.env.PAYLOAD_CMS_URL;
const PAYLOAD_API_KEY = process.env.PAYLOAD_API_KEY;

interface FormSubmissionData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  productInterest?: string;
  companySize?: string;
  coverLetter?: string;
  linkedinUrl?: string;
  source: 'contact' | 'demo' | 'application';
  jobListing?: string;
  resume?: string;
}

export async function createFormSubmission(
  data: FormSubmissionData
): Promise<{ id: string }> {
  const res = await fetch(`${PAYLOAD_URL}/api/form-submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(PAYLOAD_API_KEY
        ? { Authorization: `Bearer ${PAYLOAD_API_KEY}` }
        : {}),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to create form submission: ${error}`);
  }

  return res.json();
}

export async function uploadResume(
  file: File,
  applicantName: string
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('applicantName', applicantName);

  const res = await fetch(`${PAYLOAD_URL}/api/resumes`, {
    method: 'POST',
    headers: {
      ...(PAYLOAD_API_KEY
        ? { Authorization: `Bearer ${PAYLOAD_API_KEY}` }
        : {}),
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to upload resume: ${error}`);
  }

  const doc = await res.json();
  return doc.doc.id;
}
