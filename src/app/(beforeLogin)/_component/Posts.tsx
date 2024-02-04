'use client';

import { useContext } from 'react';
import { TabContext } from './TabProvider';
import PostsForYou from './PostsForYou';
import PostsFollowing from './PostsFollowing';

export default function Posts() {
  const { activeTab } = useContext(TabContext);

  if (activeTab === 0) {
    return <PostsForYou />;
  }
  return <PostsFollowing />;
}
