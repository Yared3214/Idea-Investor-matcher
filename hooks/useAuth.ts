import { loginApi } from '@/lib/auth.api'
import { useAuthStore } from '@/store/useAuthStore'

export function useAuth() {
  const setAuth = useAuthStore((s) => s.setAuth)
  const logoutStore = useAuthStore((s) => s.logout)

  const login = async (email: string, password: string) => {
    const { accessToken, user } = await loginApi(email, password)

    await setAuth(accessToken, user)
  }

  const logout = async () => {
    await logoutStore()
  }

  return { login, logout }
}
