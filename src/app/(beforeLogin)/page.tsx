import styles from './style.module.scss';
import classNames from 'classnames/bind';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import TabProvider from './_component/TabProvider';
import Tab from './_component/Tab';
import Posts from './_component/Posts';
import { getPostsForYou } from './_lib/getPostsForYou';
import { getPostsFollowing } from './_lib/getPostsFollowwing';
import { Suspense } from 'react';
import Loading from './loading';
import { getPost } from './_lib/getPost';

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
  await queryClient.prefetchQuery({
    queryKey: ['post', 'single'],
    queryFn: getPost,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab data={['For you', 'Following']} />
          <Suspense fallback={<Loading />}>
            <Posts />
          </Suspense>
        </TabProvider>
      </HydrationBoundary>
    </>
  );
}
