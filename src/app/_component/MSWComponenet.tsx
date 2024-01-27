// src\app\_component\MSWCoponent.tsx
// 로그인 전이나, 로그인 후에 동일하게 사용되므로 app 폴더 하위에 컴포넌트를 생성해준다.
'use client'
import { useEffect } from 'react'

export const MSWComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        require('@/mocks/browser')
      }
    }
  }, [])

  return null
}
