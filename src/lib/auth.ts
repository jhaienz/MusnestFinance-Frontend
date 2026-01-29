export type UserRole = 'client' | 'admin'

interface JwtPayload {
  role: UserRole
  exp?: number
  [key: string]: unknown
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const payload = parts[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decoded) as JwtPayload
  } catch {
    return null
  }
}

export function getToken(role: UserRole): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(role === 'client' ? 'clientToken' : 'adminToken')
}

export function isAuthenticated(role: UserRole): boolean {
  // Skip auth check on server-side (SSR) - will be checked on client
  if (typeof window === 'undefined') return true

  const token = getToken(role)
  if (!token) return false

  const payload = decodeJwt(token)
  if (!payload) return false

  // Check if token is expired
  if (payload.exp && payload.exp * 1000 < Date.now()) {
    clearToken(role)
    return false
  }

  return payload.role === role
}

export function clearToken(role: UserRole): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(role === 'client' ? 'clientToken' : 'adminToken')
}

export function getCurrentUser(): { role: UserRole } | null {
  // Check client token first
  const clientToken = getToken('client')
  if (clientToken) {
    const payload = decodeJwt(clientToken)
    if (payload?.role === 'client') {
      return { role: 'client' }
    }
  }

  // Check admin token
  const adminToken = getToken('admin')
  if (adminToken) {
    const payload = decodeJwt(adminToken)
    if (payload?.role === 'admin') {
      return { role: 'admin' }
    }
  }

  return null
}

// Client-side only auth check (for use after hydration)
export function isAuthenticatedClient(role: UserRole): boolean {
  if (typeof window === 'undefined') return false

  const token = getToken(role)
  if (!token) return false

  const payload = decodeJwt(token)
  if (!payload) return false

  if (payload.exp && payload.exp * 1000 < Date.now()) {
    clearToken(role)
    return false
  }

  return payload.role === role
}

// Get client ID from JWT token (sub field)
export function getClientId(): string | null {
  const token = getToken('client')
  if (!token) return null
  const payload = decodeJwt(token)
  return (payload?.sub as string) || null
}
