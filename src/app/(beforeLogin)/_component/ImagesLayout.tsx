import Image from 'next/image';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './imagesLayout.module.scss';
import Link from 'next/link';

export default function ImagesLayout({ post }: any) {
  const cx = classNames.bind(styles);
  return (
    <div className={cx('wrap')}>
      {post?.images.length === 3 ? (
        <div className={cx('imgInner', 'img3')}>
          <Link href={'/'} className={cx('img')}>
            <Image src={post.images[0].url} alt="" fill sizes="100%" priority />
          </Link>
          <div className={cx('right')}>
            <Link href={'/'} className={cx('img')}>
              <Image
                src={post.images[1].url}
                alt=""
                fill
                sizes="100%"
                priority
              />
            </Link>
            <Link href={'/'} className={cx('img')}>
              <Image
                src={post.images[2].url}
                alt=""
                fill
                sizes="100%"
                priority
              />
            </Link>
          </div>
        </div>
      ) : (
        <>
          {post?.images.length !== 0 && (
            <div
              className={cx('imgInner', post?.images.length === 1 && 'img1')}
            >
              {post?.images.map((image: any, index: number) => (
                <Link href={'/'} key={index} className={cx('img')}>
                  <Image src={image.url} alt="" fill sizes="100%" priority />
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
