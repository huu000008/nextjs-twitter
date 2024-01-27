import React from 'react'
import Link from 'next/link'
import styles from './style.module.scss'
import classNames from 'classnames/bind'
import SnsLogin from '../_component/SnsLogin/page'

export default function Login() {
  const cx = classNames.bind(styles)

  return (
    <>
      <div className={cx('wrap')}>
        <form>
          <input type="text" placeholder="id" />
          <input type="password" placeholder="password" />
          <Link href={'/login'} className={cx('button')}>
            로그인
          </Link>
        </form>
        <div>or</div>
        <SnsLogin />
        <Link href={'/signup'}>회원가입</Link>
      </div>
    </>
  )
}
