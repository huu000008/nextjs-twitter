'use client';

import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/app/(beforeLogin)/_lib/getPost';

type Props = {};

export default function ModalPhoto({}: Props) {
  const cx = classNames.bind(styles);

  const { data } = useQuery({
    queryKey: ['posts', 'single'],
    queryFn: getPost,
  });
  console.log(data);
  return (
    <div className={cx('wrap')}>
      <div className={cx('modal')}>
        <div className={cx('photo')}></div>
        <div className={cx('text')}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
  );
}
