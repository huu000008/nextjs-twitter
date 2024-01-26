import React from 'react'
import Link from 'next/link'
import styles from './main.module.scss'

export default function Main() {
  return (
    <>
      <div className={styles.box}>
        <Link href={'/login'}>로그인</Link>
        <Link href={'/signup'}>회원가입</Link>
      </div>
    </>
  )
}
