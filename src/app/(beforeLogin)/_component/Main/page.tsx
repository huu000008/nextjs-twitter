'use client';

import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Main() {
  const cx = classNames.bind(styles);

  return (
    <>
      <div className={cx('wrap')}>
        메인화면
        <Link href={'/login'}>로그인</Link>
        <button onClick={() => signOut()}>로그아웃</button>
      </div>
    </>
  );
}
