import React from 'react';
import classNames from 'classnames/bind';
import styles from './trend.module.scss';

export default function Trend() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('wrap')}>
      <div className={cx('country')}>Trending in South Korea</div>
      <div className={cx('hash')}>#탈덕</div>
      <div className={cx('count')}>1,123 posts</div>
      <button type="button">
        <svg viewBox="0 0 24 24" width={16} aria-hidden="true">
          <g>
            <path
              fill="#fff"
              d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  );
}
