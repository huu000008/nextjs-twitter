import styles from './style.module.scss';
import classNames from 'classnames/bind';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import Menu from './_component/Menu';
import TabProvider from './_component/TabProvider';
import Tab from './_component/Tab';
import SearchBox from './_component/SearchBox';
import Posts from './_component/Posts';
import Trends from './_component/Trends';
import { getPostsForYou } from './_lib/getPostsForYou';
import { getPostsFollowing } from './_lib/getPostsFollowwing';
import { Suspense } from 'react';
import Loading from './loading';

export default async function Page() {
  const cx = classNames.bind(styles);

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'foryou'],
    queryFn: getPostsForYou,
    initialPageParam: 0,
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'following'],
    queryFn: getPostsFollowing,
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <div className={cx('wrap')}>
        <div className={cx('left')}>
          <div className={cx('inner')}>
            <Menu />
          </div>
        </div>
        <div className={cx('center')}>
          <HydrationBoundary state={dehydratedState}>
            <TabProvider>
              <Tab data={['For you', 'Following']} />
              <Suspense fallback={<Loading />}>
                <Posts />
              </Suspense>
            </TabProvider>
          </HydrationBoundary>
        </div>
        <div className={cx('right')}>
          <div className={cx('inner')}>
            <SearchBox />
            <Trends />
          </div>
        </div>
      </div>
    </>
  );
}
