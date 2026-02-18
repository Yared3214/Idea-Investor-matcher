import { AuthResponse } from '@/types/auth'
import Constants from 'expo-constants'

const API_URL = Constants.expoConfig?.extra?.API_URL

export async function signupApi(fullName: string, email: string, password: string, role: 'ENTREPRENEUR' | 'INVESTOR' | 'ADMIN'): Promise<{ success: boolean, message?: string }> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password, role }),
  })

  if (res.status === 201) {
    return { success: true }
  } else {
    const errorData = await res.json()
    return { success: false, message: errorData.message || 'Signup failed' }
  }
}


export async function loginApi(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (res.status === 201) {
    const data: AuthResponse = await res.json()
    return data
  } else {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Login failed')
  }
}

export async function verifyEmailApi(email: string, code: string): Promise<{ success: boolean, message?: string }> {
  const res = await fetch(`${API_URL}/auth/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp: code }),
  })

  if (res.status === 201) {
    return { success: true }
  } else {
    const errorData = await res.json()
    return { success: false, message: errorData.message || 'Signup failed' }
  }
}

export async function resendOtpApi(email: string) {
  const res = await fetch(`${API_URL}/auth/resend-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (res.status === 201) {
    return { success: true }
  } else {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Request failed')
  }
}

export async function forgotPasswordApi(email: string) {
  const res = await fetch(`${API_URL}/auth/forget-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (res.status === 201) {
    return { success: true }
  } else {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Request failed')
  }
}

export async function resetPasswordApi(email: string, token: string, newPassword: string): Promise<{ success: boolean, message?: string }> {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token, newPassword }),
  })

  if (res.status === 201) {
    return { success: true }
  } else {
    const errorData = await res.json()
    return { success: false, message: errorData.message || 'Reset failed' }
  }
} 