'use client';

import { getPosts } from '../_lib/getPosts';
import { useQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/app/model/Post';
import Post from './Post';
import classNames from 'classnames/bind';
import styles from './posts.module.scss';

export default function Posts() {
  const cx = classNames.bind(styles);
  const { data } = useQuery({
    queryKey: ['get', 'posts'],
    queryFn: getPosts,
  });
  return (
    <div className={cx('wrap')}>
      {data?.map((item: IPost) => (
        <Post post={item} key={item.postId} />
      ))}
    </div>
  );
}
