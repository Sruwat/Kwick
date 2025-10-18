// Minimal auth helper for frontend
const API_BASE = import.meta.env.VITE_API_URL || '';

export async function signup(data: { name: string; email: string; phone?: string; password: string }) {
  const res = await fetch(API_BASE + '/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(data: { email: string; password: string }) {
  const res = await fetch(API_BASE + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (json && json.token) {
    localStorage.setItem('kwick_token', json.token);
    localStorage.setItem('kwick_user', JSON.stringify(json.user));
  }
  return json;
}

export function getToken() {
  return localStorage.getItem('kwick_token');
}

export function logout() {
  localStorage.removeItem('kwick_token');
  localStorage.removeItem('kwick_user');
}
