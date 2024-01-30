import styles from './main.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import Posts from './Posts';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getPosts } from '../_lib/getPosts';
import Logout from './Logout';

export default async function Main() {
  const cx = classNames.bind(styles);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get', 'posts'],
    queryFn: getPosts,
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
            <Posts />
          </HydrationBoundary>
        </div>
        <div className={cx('right')}></div>
      </div>
    </>
  );
}
