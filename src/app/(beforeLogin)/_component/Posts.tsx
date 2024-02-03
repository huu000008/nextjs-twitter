'use client';

import { getPostsForYou } from '../_lib/getPostsForYou';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/app/model/Post';
import Post from './Post';
import classNames from 'classnames/bind';
import styles from './posts.module.scss';
import { getPostsFollowing } from '../_lib/getPostsFollowwing';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { TabContext } from './TabProvider';
import { useInView } from 'react-intersection-observer';
import PostsForYou from './PostsForYou';
import PostsFollowing from './PostsFollowing';

export default function Posts() {
  const { activeTab } = useContext(TabContext);

  if (activeTab === 0) {
    return <PostsForYou />;
  }
  return <PostsFollowing />;
}
