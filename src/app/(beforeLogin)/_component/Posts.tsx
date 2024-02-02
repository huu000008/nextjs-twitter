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

export default function Posts() {
  const cx = classNames.bind(styles);
  const {
    data: forYouData,
    fetchNextPage,
    hasNextPage,
    isFetching,
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
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  const { data: followingData } = useQuery({
    queryKey: ['posts', 'following'],
    queryFn: getPostsFollowing,
  });

  const tacContext = useContext(TabContext);

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 200,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
  return (
    <div className={cx('wrap')}>
      {tacContext.activeTab === 0
        ? forYouData?.pages.map((item: any, index: number) => (
            <Fragment key={index}>
              {item.map((post: IPost) => (
                <Post post={post} key={post.postId} />
              ))}
            </Fragment>
          ))
        : followingData.map((item: IPost, index: number) => (
            <Fragment key={index}>
              <Post post={item} key={item.postId} />
            </Fragment>
          ))}
      <div ref={ref} style={{ height: 0 }} />
    </div>
  );
}
