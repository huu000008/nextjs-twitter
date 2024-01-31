'use client';

import React, { MouseEventHandler, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './tab.module.scss';
import { TabContext } from './TabProvider';

type Props = {
  data: string[];
};

export default function Tab({ data }: Props) {
  const cx = classNames.bind(styles);
  const tabContext = useContext(TabContext);

  const tabChange = (index: number) => {
    tabContext.setActiveTab(index);
  };
  return (
    <div className={cx('wrap')}>
      {data.map((item: string, index: number) => (
        <button
          key={index}
          type="button"
          className={cx('item', tabContext.activeTab === index && 'active')}
          onClick={() => tabChange(index)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
