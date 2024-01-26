'use client'

import React from 'react'
import Link from 'next/link'
import styles from './main.module.scss'
import { signIn, useSession } from 'next-auth/react'

export default function Main() {
  const { data: session } = useSession()

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.box}>
          <Link href={'/login'}>로그인</Link>
          <Link href={'/signup'}>회원가입</Link>
          <button onClick={() => signIn()}>Sign In</button>
        </div>
      </div>
    </>
  )
}
