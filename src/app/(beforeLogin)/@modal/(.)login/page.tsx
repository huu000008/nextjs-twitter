'use client';

import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import SnsLogin from '@/app/(beforeLogin)/_component/SnsLogin';
import { motion } from 'framer-motion';

export default function ModalLogin() {
  const cx = classNames.bind(styles);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signIn('credentials', {
        username: id,
        password,
        redirect: false,
      });
      router.replace('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = e => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = e => {
    setPassword(e.target.value);
  };

  const clickBg = () => {
    router.back();
  };

  return (
    <>
      <div className={cx('wrap')} onClick={clickBg}>
        <motion.div
          className={cx('formWrap')}
          initial={{ marginBottom: -20, opacity: 0 }}
          animate={{ marginBottom: 0, opacity: 1 }}
          exit={{ marginBottom: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={e => e.stopPropagation()}
        >
          <form onSubmit={onSubmit}>
            <input
              value={id}
              onChange={onChangeId}
              type="text"
              placeholder="id"
              required
            />
            <input
              value={password}
              onChange={onChangePassword}
              type="password"
              placeholder="password"
              required
            />
            <button type="submit" className={cx('button')}>
              로그인
            </button>
          </form>
          <div>or</div>
          <SnsLogin />
          <Link href={'/signup'} scroll={false}>
            회원가입
          </Link>
        </motion.div>
      </div>
    </>
  );
}
