import React from 'react'
import styles from './style.module.scss'
import classNames from 'classnames/bind'
import Link from 'next/link'

export default function Main() {
  const cx = classNames.bind(styles)

  return (
    <>
      <div className={cx('wrap')}>
        메인화면
        <Link href={'/login'}>로그인</Link>
      </div>
    </>
  )
}
