'use client';

import { getPostsForYou } from '../_lib/getPostsForYou';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/app/model/Post';
import Post from './Post';
import classNames from 'classnames/bind';
import styles from './posts.module.scss';
import { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';

export default function PostsForYou() {
  const cx = classNames.bind(styles);
  const {
    data: forYouData,
    fetchNextPage: forYouFetchNextPage,
    hasNextPage: forYouHasNextPage,
    isFetching: forYouIsFetching,
  } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ['posts', 'foryou'],
    queryFn: getPostsForYou,
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 500,
    onChange: (inView, entry) => {
      if (inView && !forYouIsFetching && forYouHasNextPage)
        forYouFetchNextPage();
    },
  });

  return (
    <div className={cx('wrap')}>
      {forYouData?.pages.map((item: any, index: number) => (
        <Fragment key={index}>
          {item.map((post: IPost) => (
            <Post post={post} key={post.postId} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
