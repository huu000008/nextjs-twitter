'use client';

import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getPost } from '@/app/(beforeLogin)/_lib/getPost';
import Image from 'next/image';
import Profile from '@/app/(beforeLogin)/_component/Profile';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Props = {
  params?: any;
};

export default function ModalPhoto({ params }: Props) {
  const cx = classNames.bind(styles);
  const { data } = useSuspenseQuery({
    queryKey: ['post', params.postId],
    queryFn: getPost,
  });

  const router = useRouter();
  const moveBack = () => {
    router.back();
  };

  return (
    <div className={cx('wrap')}>
      <button type="button" onClick={moveBack}>
        <svg viewBox="0 0 24 24" aria-hidden="true" width={20}>
          <g>
            <path
              fill="#fff"
              d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"
            ></path>
          </g>
        </svg>
      </button>
      <div className={cx('modal')}>
        <div className={cx('left')}>
          <Swiper spaceBetween={50} slidesPerView={1} className={cx('swiper')}>
            {data.images.map((image: any, index: number) => (
              <SwiperSlide key={index} className={cx('swiperSlide')}>
                <Image src={image.url} alt="" fill />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={cx('right')}>
          <Profile user={data.user} />
          <p>{data.content}</p>
        </div>
      </div>
    </div>
  );
}
