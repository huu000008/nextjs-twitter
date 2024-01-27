'use client'

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

type props = {
  children: ReactNode
}

export default function AuthSession({ children }: props) {
  return <SessionProvider>{children}</SessionProvider>
}
