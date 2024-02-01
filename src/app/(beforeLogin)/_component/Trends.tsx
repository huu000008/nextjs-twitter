import React from 'react';
import classNames from 'classnames/bind';
import styles from './trends.module.scss';
import Trend from './Trend';

export default function Trends() {
  const cx = classNames.bind(styles);
  return (
    <div className={cx('wrap')}>
      <div className={cx('title')}>Trends for you</div>
      <Trend />
      <Trend />
      <Trend />
      <Trend />
      <Trend />
      <Trend />
      <button type="button" className={cx('moreButton')}>
        Show more
      </button>
    </div>
  );
}
