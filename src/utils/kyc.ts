const API_BASE = import.meta.env.VITE_API_URL || '';

export async function createKyc(payload: any) {
  const res = await fetch(API_BASE + '/api/admin/kyc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  return res.json();
}

export async function updateKyc(kycId: number, payload: any) {
  const res = await fetch(API_BASE + `/api/admin/kyc/${kycId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  return res.json();
}

export async function uploadKycDocs(kycId: number | null, userId: number | null, files: File[]) {
  const form = new FormData();
  files.forEach((f) => form.append('files', f));
  if (kycId) form.append('kycId', String(kycId));
  if (userId) {
    // Some backends expect userId, others expect user_id. Send both to be safe.
    form.append('userId', String(userId));
    form.append('user_id', String(userId));
  }
  const res = await fetch(API_BASE + '/api/admin/kyc/upload', {
    method: 'POST',
    body: form,
    credentials: 'include',
  });
  return res.json();
}

// Public API: upload KYC (form fields + files) and return created kycId
export async function uploadKycPublic(payload: any, files: File[], userId?: number) {
  const form = new FormData();
  // attach simple fields
  for (const key of Object.keys(payload || {})) {
    const val = (payload as any)[key];
    if (val !== undefined && val !== null) form.append(key, String(val));
  }
  if (userId) form.append('userId', String(userId));
  // attach files under 'files' (backend expects files[])
  files.forEach((f) => form.append('files', f));

  const res = await fetch(API_BASE + '/api/kyc/upload', {
    method: 'POST',
    body: form,
    credentials: 'include',
  });
  return res.json();
}

// Public API: submit KYC as JSON and receive generated PDF blob in response
export async function submitKycJson(payload: any) {
  const res = await fetch(API_BASE + '/api/kyc/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`KYC submit failed: ${res.status} ${txt}`);
  }
  const blob = await res.blob();
  return blob;
}

// Download KYC PDF for given kycId (returns Blob)
export async function downloadKycPdf(kycId: number) {
  const res = await fetch(API_BASE + `/api/kyc/${kycId}/download`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Download failed: ${res.status} ${txt}`);
  }
  return await res.blob();
}

export async function listKycDocs(kycId: number) {
  const res = await fetch(API_BASE + `/api/admin/kyc/${kycId}/documents`, {
    credentials: 'include',
  });
  return res.json();
}

export function getKycPdfUrl(kycId: number) {
  // Returns a URL you can set as href for download
  return (import.meta.env.VITE_API_URL || '') + `/api/admin/kyc/${kycId}/download`;
}
