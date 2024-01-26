import React from 'react'
import styles from './login.module.scss'

export default function LoginModal() {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.loginForm}>
          <input type="text" />
          <input type="password" />
          <button type="button">로그인</button>
        </div>
      </div>
    </>
  )
}
