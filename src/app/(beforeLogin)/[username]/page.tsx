import React from 'react';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getPost } from '../_lib/getPost';

type Props = {};

export default function Page({}: Props) {
  const queryClient = new QueryClient();
  // queryClient.prefetchQuery({ queryKey: ['post', 'single'], queryFn: getPost });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>유저 페이지</HydrationBoundary>
    </div>
  );
}
