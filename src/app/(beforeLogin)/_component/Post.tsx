import { Post } from '@/app/model/Post';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './post.module.scss';
import Profile from './Profile';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ImagesLayout from './ImagesLayout';

type Props = {
  post: Post;
};

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function Post({ post }: Props) {
  const cx = classNames.bind(styles);
  return (
    <div className={cx('wrap')}>
      <div key={post.postId}>
        <div className={cx('top')}>
          <Profile user={post.user} />
          <div className={cx('date')}>
            {dayjs(post.createdAt).fromNow(true)}
          </div>
        </div>
        <div className={cx('contentWrap')}>
          <p className={cx('content')}>{post.content}</p>
          <ImagesLayout images={post.images} />
        </div>
      </div>
    </div>
  );
}
