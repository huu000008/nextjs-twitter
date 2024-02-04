import Image from 'next/image';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './imagesLayout.module.scss';
import { useRouter } from 'next/navigation';

export default function ImagesLayout({ post }: any) {
  const cx = classNames.bind(styles);

  const router = useRouter();
  const openModal = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/${post.user.id}/${post.postId}/1`);
  };

  return (
    <div className={cx('wrap')}>
      {post?.images.length === 3 ? (
        <div className={cx('imgInner', 'img3')}>
          <div className={cx('img')} onClick={openModal}>
            <Image src={post.images[0].url} alt="" fill sizes="100%" priority />
          </div>
          <div className={cx('right')}>
            <div className={cx('img')} onClick={openModal}>
              <Image
                src={post.images[1].url}
                alt=""
                fill
                sizes="100%"
                priority
              />
            </div>
            <div className={cx('img')} onClick={openModal}>
              <Image
                src={post.images[2].url}
                alt=""
                fill
                sizes="100%"
                priority
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {post?.images.length !== 0 && (
            <div
              className={cx('imgInner', post?.images.length === 1 && 'img1')}
            >
              {post?.images.map((image: any, index: number) => (
                <div key={index} className={cx('img')} onClick={openModal}>
                  <Image src={image.url} alt="" fill sizes="100%" priority />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
