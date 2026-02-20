import * as SecureStore from 'expo-secure-store'
import { create } from 'zustand'

export type User = {
  id: string
  email: string
  role: 'ENTREPRENEUR' | 'INVESTOR' | 'ADMIN'
  fullName?: string
  isOnboarded?: boolean
}

type AuthState = {
  user: User | null
  token: string | null
  loading: boolean

  setAuth: (token: string, user: User) => Promise<void>
  logout: () => Promise<void>
  restore: () => Promise<void>

  updateUser: (updates: Partial<User>) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: true,

  // 🔐 Save after login
  setAuth: async (token, user) => {
    await SecureStore.setItemAsync('token', token)
    await SecureStore.setItemAsync('user', JSON.stringify(user))

    set({
      token,
      user,
      loading: false,
    })
  },

  // 🚪 Logout
  logout: async () => {
    await SecureStore.deleteItemAsync('token')
    await SecureStore.deleteItemAsync('user')

    set({
      token: null,
      user: null,
      loading: false,
    })
  },

  // 🔄 Restore on app start
  restore: async () => {
    const token = await SecureStore.getItemAsync('token')
    const userString = await SecureStore.getItemAsync('user')

    if (!token || !userString) {
      set({ loading: false })
      return
    }

    try {
      const user = JSON.parse(userString)

      set({
        token,
        user,
        loading: false,
      })
    } catch {
      // If corrupted
      await SecureStore.deleteItemAsync('token')
      await SecureStore.deleteItemAsync('user')

      set({
        token: null,
        user: null,
        loading: false,
      })
    }
  },

  updateUser: async (updates) => {
    const currentUser = get().user
    if (!currentUser) return

    const updatedUser = { ...currentUser, ...updates }

    await SecureStore.setItemAsync('user', JSON.stringify(updatedUser))

    set({
      user: updatedUser,
    })
  },
}))
