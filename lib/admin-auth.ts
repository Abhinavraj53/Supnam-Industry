import { cookies } from 'next/headers';

const ADMIN_COOKIE = 'pujnam_admin';
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'pujnam-secret-token-2024';

export function verifyCredentials(username: string, password: string) {
  return username === ADMIN_USER && password === ADMIN_PASS;
}

export function getAdminToken() {
  return ADMIN_TOKEN;
}

export function isAuthenticated() {
  const cookie = cookies().get(ADMIN_COOKIE);
  return cookie?.value === ADMIN_TOKEN;
}

export const ADMIN_COOKIE_NAME = ADMIN_COOKIE;
