'use client';

import { signIn, useSession } from 'next-auth/react';
import classNames from 'classnames/bind';
import styles from './snsLogin.module.scss';

export default function SnsLogin() {
  const { data: session } = useSession();
  const cx = classNames.bind(styles);

  return (
    <>
      <button
        className={cx('button', 'kakao')}
        onClick={() => signIn('kakao', { redirect: true, callbackUrl: '/' })}
      >
        kakao login
      </button>
      <button
        className={cx('button', 'naver')}
        onClick={() => signIn('naver', { redirect: true, callbackUrl: '/' })}
      >
        naver login
      </button>
      <button
        className={cx('button', 'google')}
        onClick={() => signIn('google', { redirect: true, callbackUrl: '/' })}
      >
        google login
      </button>
      <button
        className={cx('button', 'google')}
        onClick={() => signIn('apple', { redirect: true, callbackUrl: '/' })}
      >
        apple login
      </button>
    </>
  );
}
