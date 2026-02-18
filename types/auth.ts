export type AuthResponse = {
  user: {
    id: string
    fullName: string
    email: string
    role: 'ENTREPRENEUR' | 'INVESTOR' | 'ADMIN'
}
    access_token: string | null
    refresh_token: string | null
    message?: string
}