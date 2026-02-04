// Простая система аутентификации для админ-панели
// В продакшене используйте более надежные решения (NextAuth.js, etc)

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'Sofia';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'SofRus006';
const ADMIN_SESSION_TOKEN = 'admin_session_token';

export interface AdminCredentials {
  username: string;
  password: string;
}

export function validateCredentials(credentials: AdminCredentials): boolean {
  return (
    credentials.username === ADMIN_USERNAME &&
    credentials.password === ADMIN_PASSWORD
  );
}

export function setAdminSession(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_SESSION_TOKEN, token);
  }
}

export function getAdminSession(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(ADMIN_SESSION_TOKEN);
  }
  return null;
}

export function clearAdminSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_SESSION_TOKEN);
  }
}

export function isAuthenticated(): boolean {
  const session = getAdminSession();
  return session === 'authenticated';
}
