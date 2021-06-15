import { createContext, useEffect, useState } from 'react'
import Router from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { refreshPayload, refreshToken, tokenAuth } from '@/services/auth'

type Payload = {
  email: string
  exp: number
  origIat: number
}

type ExtraData = { redirectTo?: string; next?: string }

interface SignInData extends ExtraData {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  payload: Payload | null
  signIn: (data: SignInData) => Promise<void>
  signOut: (redirectTo?: string) => Promise<void>
  refresh: () => Promise<void>
}
export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
  const [payload, setPayload] = useState<Payload | null>(null)

  const [isAuthenticated, setIsAuthenticated] = useState(!!payload)

  async function signIn({ email, password, redirectTo = '/' }: SignInData) {
    const { token, payload } = await tokenAuth({
      email,
      password
    })

    setCookie(undefined, 'medico:token', token, {
      maxAge: 60 * 60 * 12, // 12 horas
      path: '/'
    })

    setPayload(payload)

    Router.push(redirectTo)
  }

  async function signOut(redirectTo = '/') {
    destroyCookie(undefined, 'medico:token', {
      path: '/'
    })
    setPayload(null)
    setIsAuthenticated(false)

    Router.push(redirectTo)
  }

  async function refresh() {
    const { 'medico:token': token } = parseCookies()
    if (token) {
      const { token: newToken } = await refreshToken(token).catch(() =>
        signOut()
      )

      refreshPayload(newToken)
        .then((response) => setPayload(response?.payload))
        .catch(() => signOut())

      setCookie(undefined, 'medico:token', newToken, {
        maxAge: 60 * 60 * 12, // 12 horas
        path: '/' // 12 horas
      })
    }
  }

  useEffect(() => {
    const { 'medico:token': token } = parseCookies()
    if (token) {
      refreshPayload(token)
        .then((response) => setPayload(response?.payload))
        .catch(() => signOut())
    }
  }, [])

  useEffect(() => {
    setIsAuthenticated(!!payload)
  }, [payload])

  return (
    <AuthContext.Provider
      value={{ payload, isAuthenticated, signIn, signOut, refresh }}
    >
      {children}
    </AuthContext.Provider>
  )
}
