import Image from 'next/image';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './imagesLayout.module.scss';

export default function ImagesLayout({ images }: any) {
  const cx = classNames.bind(styles);
  return (
    <div className={cx('wrap')}>
      {images.length === 3 ? (
        <div className={cx('imgInner', 'img3')}>
          <div className={cx('img')}>
            <Image src={images[0].url} alt="" fill sizes="100%" priority />
          </div>
          <div className={cx('right')}>
            <div className={cx('img')}>
              <Image src={images[1].url} alt="" fill sizes="100%" priority />
            </div>
            <div className={cx('img')}>
              <Image src={images[2].url} alt="" fill sizes="100%" priority />
            </div>
          </div>
        </div>
      ) : (
        <>
          {images.length !== 0 && (
            <div className={cx('imgInner', images.length === 1 && 'img1')}>
              {images.map((image: any, key: number) => (
                <div key={`img${key + image.id} `} className={cx('img')}>
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
