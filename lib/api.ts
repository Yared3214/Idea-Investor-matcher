import { useAuthStore } from '@/store/useAuthStore'

export async function apiFetch(path: string, options: any = {}) {
  const token = useAuthStore.getState().token

  return fetch(`https://api.yourapp.com${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  })
}
