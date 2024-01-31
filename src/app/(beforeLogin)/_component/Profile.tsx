import React from 'react';
import classNames from 'classnames/bind';
import styles from './profile.module.scss';
import Image from 'next/image';
import { User } from '@/app/model/User';

type Props = {
  user: User;
};

export default function Profile({ user }: Props) {
  const cx = classNames.bind(styles);
  return (
    <div className={cx('wrap')}>
      <div className={cx('img')}>
        <Image src={user.image} alt="img" width={40} height={40} />
      </div>
      <p className={cx('name')}>{user?.name}</p>
      <p className={cx('id')}>@{user?.id}</p>
    </div>
  );
}
