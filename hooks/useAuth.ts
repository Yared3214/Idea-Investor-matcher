import { forgotPasswordApi, loginApi, resendOtpApi, resetPasswordApi, signupApi, verifyEmailApi } from '@/lib/api/auth.api'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'expo-router'
import { useState } from 'react'

export function useAuth() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const setAuth = useAuthStore((s) => s.setAuth)
  const logoutStore = useAuthStore((s) => s.logout)
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setError(null)
    setLoading(true)
    try {
      const res = await loginApi(email, password)

      if (res.access_token && res.user) {
        await setAuth(res.access_token, res.user)
      }
      router.replace('/')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const signup = async (fullName: string, email: string, password: string, role: 'ENTREPRENEUR' | 'INVESTOR' | 'ADMIN'): Promise<{success: boolean, message?: string}> => {
    setError(null)
    setLoading(true)
    try {
      const res = await signupApi(fullName, email, password, role);
      
      return res;
    } catch (err: any) {
      setError(err.message || 'Signup failed')
      return { success: false, message: err.message || 'Signup failed' }
    } finally {
      setLoading(false)
    }
  }

  const verifyEmail = async (email: string, code: string): Promise<{success: boolean, message?: string}> => {
    setError(null)
    setLoading(true)

    try {
      const res = await verifyEmailApi(email, code);

      return res;
    } catch (err: any) {
      setError(err.message || 'Email verification failed')
      return { success: false, message: err.message || 'Email verification failed' }
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = async (email: string) => {
    setError(null)
    setLoading(true)

    try {
      const res = await resendOtpApi(email);

      if (res?.success) {
        alert("OTP resent! Please check your email.")
      }
    } catch (err: any) {
      setError(err.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    setError(null)
    setLoading(true)

    try {
      const res = await forgotPasswordApi(email);

      if (res?.success) {
        alert("If an account with that email exists, a reset link has been sent.")
        router.back();
      }
    } catch (err: any) {
      setError(err.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string, token: string, newPassword: string) => {
    setError(null)
    setLoading(true)

    try {
      const res = await resetPasswordApi(email, token, newPassword);

      if (res?.success) {
        alert("Password reset successful! You can now log in with your new password.")
        router.replace('/login');
      }
    } catch (err: any) {
      setError(err.message || 'Password reset failed')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await logoutStore()
  }

  return { login, logout, signup, verifyEmail, resendOtp, forgotPassword, resetPassword, error, loading }
}
