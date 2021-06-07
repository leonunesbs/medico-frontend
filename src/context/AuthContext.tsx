import { recoverPayload, tokenAuth } from '@/services/auth'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { createContext, useEffect, useState } from 'react'
import Router from 'next/router'

type Payload = {
  email: string
  exp: number
  origIat: number
}

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  payload: Payload | null
  signIn: (data: SignInData) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
  const [payload, setPayload] = useState<Payload | null>(null)

  const isAuthenticated = !!payload

  useEffect(() => {
    const { 'medico:token': token } = parseCookies()

    if (token) {
      recoverPayload(token).then((response) => setPayload(response.payload))
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const { token, payload } = await tokenAuth({
      email,
      password
    })

    setCookie(undefined, 'medico:token', token, {
      maxAge: 60 * 60 * 12 // 12 horas
    })

    setPayload(payload)

    Router.push('/p/leonunesbs@gmail.com')
  }

  async function signOut() {
    setPayload(null)
    destroyCookie(undefined, 'medico:token')
    Router.push('/')
  }

  return (
    <AuthContext.Provider value={{ payload, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
