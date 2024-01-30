import styles from './main.module.scss';
import classNames from 'classnames/bind';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Post from './Post';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getPosts } from '../_lib/getPosts';

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
            {/* <button onClick={() => signOut()}>로그아웃</button> */}
          </nav>
        </div>
        <div className={cx('center')}>
          <HydrationBoundary state={dehydratedState}>
            <Post />
          </HydrationBoundary>
        </div>
        <div className={cx('right')}></div>
      </div>
    </>
  );
}
