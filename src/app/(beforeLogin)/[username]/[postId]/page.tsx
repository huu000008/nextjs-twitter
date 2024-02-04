import React from 'react';

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getPost } from '../../_lib/getPost';
import PostSingle from './_component/PostSingle';

type Props = {
  params: { postId: string };
};

export default async function Page({ params }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['post', params.postId],
    queryFn: getPost,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <PostSingle id={params.postId} />
      </HydrationBoundary>
    </div>
  );
}
