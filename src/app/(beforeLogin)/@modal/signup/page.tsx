'use client'

import React from 'react'
import styles from './style.module.scss'
import classNames from 'classnames/bind'
import { useRouter } from 'next/navigation'

export default function Modal() {
  const cx = classNames.bind(styles)
  const route = useRouter()

  const clickBg = () => {
    route.back()
  }

  return (
    <div className={cx('wrap')} onClick={clickBg}>
      <form onClick={e => e.stopPropagation()}>
        <input type="text" placeholder="id" />
        <input type="password" placeholder="password" />
        <input type="name" placeholder="name" />
        <button>회원가입</button>
      </form>
    </div>
  )
}
