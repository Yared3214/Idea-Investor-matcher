import { useAuthStore } from '@/store/useAuthStore'

const API_URL = process.env.API_URL;

export async function apiFetch(path: string, options: any = {}) {
  const token = useAuthStore.getState().token

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  })
}
