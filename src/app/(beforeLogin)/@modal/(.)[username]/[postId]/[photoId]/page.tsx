'use client';

import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getPost } from '@/app/(beforeLogin)/_lib/getPost';
import Image from 'next/image';
import Profile from '@/app/(beforeLogin)/_component/Profile';

type Props = {
  params?: any;
};

export default function ModalPhoto({ params }: Props) {
  const cx = classNames.bind(styles);
  const { data } = useSuspenseQuery({
    queryKey: ['post', params.postId],
    queryFn: getPost,
  });

  return (
    <div className={cx('wrap')}>
      <div className={cx('modal')}>
        <div className={cx('left')}>
          {data.images.map((image: any, index: number) => (
            <Image key={index} src={image.url} alt="" width={50} height={50} />
          ))}
        </div>
        <div className={cx('right')}>
          <Profile user={data.user} />
          <p>{data.content}</p>
        </div>
      </div>
    </div>
  );
}
