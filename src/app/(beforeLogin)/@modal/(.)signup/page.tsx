'use client';

import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { redirect, useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import signupAction from '../../_lib/signup';
import { motion } from 'framer-motion';

export default function ModalSignup() {
  const cx = classNames.bind(styles);
  const router = useRouter();

  const [state, formAction] = useFormState(signupAction, { message: null });
  const clickBg = () => {
    router.back();
  };
  function showMessage(message: string | null) {
    console.log('message', message);
    if (message === 'no_id') {
      return '아이디를 입력하세요.';
    }
    if (message === 'no_name') {
      return '닉네임을 입력하세요.';
    }
    if (message === 'no_password') {
      return '비밀번호를 입력하세요.';
    }
    if (message === 'no_image') {
      return '이미지를 업로드하세요.';
    }
    if (message === 'user_exists') {
      return '이미 사용 중인 아이디입니다.';
    }
    return '';
  }

  return (
    <div className={cx('wrap')} onClick={clickBg}>
      <motion.div
        initial={{ marginBottom: -20, opacity: 0 }}
        animate={{ marginBottom: 0, opacity: 1 }}
        exit={{ marginBottom: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cx('formWrap')}
        onClick={e => e.stopPropagation()}
      >
        <form action={formAction}>
          <input type="text" name="id" placeholder="id" required />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
          />
          <input type="text" name="name" placeholder="name" required />
          <button type="submit">회원가입</button>
        </form>
      </motion.div>
    </div>
  );
}
