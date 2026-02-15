import { create } from 'zustand'
import * as SecureStore from 'expo-secure-store'

export type User = {
  id: string
  email: string
  role: 'startup' | 'investor' | 'advisor'
  name?: string
  location?: string
}

type AuthState = {
  user: User | null
  token: string | null
  loading: boolean

  setAuth: (token: string, user: User) => Promise<void>
  logout: () => Promise<void>
  restore: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: true,

  // Save after login
  setAuth: async (token, user) => {
    await SecureStore.setItemAsync('token', token)

    set({
      token,
      user,
      loading: false,
    })
  },

  // Logout
  logout: async () => {
    await SecureStore.deleteItemAsync('token')

    set({
      token: null,
      user: null,
    })
  },

  // Restore on app start
  restore: async () => {
    const token = await SecureStore.getItemAsync('token')

    if (!token) {
      set({ loading: false })
      return
    }

    set({
      token,
      loading: false,
    })
  },
}))
