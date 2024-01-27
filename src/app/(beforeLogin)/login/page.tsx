'use client';

import { FormEventHandler, useState } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import classNames from 'classnames/bind';
import SnsLogin from '../_component/SnsLogin/page';
import { useRouter } from 'next/navigation';

export default function Login() {
  const cx = classNames.bind(styles);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  return (
    <>
      <div className={cx('wrap')}>
        <form>
          <input type="text" placeholder="id" />
          <input type="password" placeholder="password" />
          <button className={cx('button')}>로그인</button>
        </form>
        <div>or</div>
        <SnsLogin />
        <Link href={'/signup'}>회원가입</Link>
      </div>
    </>
  );
}
