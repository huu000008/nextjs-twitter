'use client';

import { getPostsForYou } from '../_lib/getPostsForYou';
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { Post as IPost } from '@/app/model/Post';
import Post from './Post';
import classNames from 'classnames/bind';
import styles from './posts.module.scss';
import { getPostsFollowing } from '../_lib/getPostsFollowwing';
import { Fragment, useContext, useEffect, useState } from 'react';
import { TabContext } from './TabProvider';
import { useInView } from 'react-intersection-observer';

export default function PostsFollowing() {
  const cx = classNames.bind(styles);

  const {
    data: followingData,
    fetchNextPage: followingFetchNextPage,
    hasNextPage: followingHasNextPage,
    isFetching: followingIsFetching,
  } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ['posts', 'following'],
    queryFn: getPostsFollowing,
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const tacContext = useContext(TabContext);

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 500,
    onChange: (inView, entry) => {
      if (inView && !followingIsFetching && followingHasNextPage)
        followingFetchNextPage();
    },
  });

  return (
    <div className={cx('wrap')}>
      {followingData?.pages.map((item: any, index: number) => (
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
