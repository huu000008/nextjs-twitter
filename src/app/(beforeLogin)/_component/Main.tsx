import styles from './main.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import Posts from './Posts';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import Logout from './Logout';
import Tab from './Tab';
import TabProvider from './TabProvider';
import { getPostsForYou } from '../_lib/getPostsForYou';
import { getPostsFollowing } from '../_lib/getPostsFollowwing';

export default async function Main() {
  const cx = classNames.bind(styles);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'foryou'],
    queryFn: getPostsForYou,
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'following'],
    queryFn: getPostsFollowing,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <div className={cx('wrap')}>
        <div className={cx('left')}>
          <nav>
            <Link href={''}>HOME</Link>
            <Link href={'/login'}>로그인</Link>
            <Logout />
          </nav>
        </div>
        <div className={cx('center')}>
          <HydrationBoundary state={dehydratedState}>
            <TabProvider>
              <Tab data={['For you', 'Following']} />
              <Posts />
            </TabProvider>
          </HydrationBoundary>
        </div>
        <div className={cx('right')}></div>
      </div>
    </>
  );
}
