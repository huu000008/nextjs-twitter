'use client';

import { getPostsForYou } from '../_lib/getPostsForYou';
import { useQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/app/model/Post';
import Post from './Post';
import classNames from 'classnames/bind';
import styles from './posts.module.scss';
import { getPostsFollowing } from '../_lib/getPostsFollowwing';
import { useContext, useEffect, useState } from 'react';
import { TabContext } from './TabProvider';

export default function Posts() {
  const cx = classNames.bind(styles);
  const { data: forYouData } = useQuery({
    queryKey: ['posts', 'foryou'],
    queryFn: getPostsForYou,
  });

  const { data: followingData } = useQuery({
    queryKey: ['posts', 'following'],
    queryFn: getPostsFollowing,
  });

  const tacContext = useContext(TabContext);

  const [activeData, setActiveData] = useState([]);
  useEffect(() => {
    if (tacContext.activeTab === 0) {
      setActiveData(forYouData);
    } else if (tacContext.activeTab === 1) {
      setActiveData(followingData);
    }
  }, [tacContext.activeTab, forYouData, followingData]);
  return (
    <div className={cx('wrap')}>
      {activeData?.map((item: IPost) => (
        <Post post={item} key={item.postId} />
      ))}
    </div>
  );
}
