'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Post as IPost } from '@/app/model/Post';
import { getPost } from '@/app/(beforeLogin)/_lib/getPost';
import Post from '../../../_component/Post';

type Props = {
  id: string;
};

export default function PostSingle({ id }: Props) {
  const { data, error } = useQuery<
    IPost,
    Object,
    IPost,
    [_1: string, _2: string]
  >({
    queryKey: ['post', id],
    queryFn: getPost,
  });

  return <div>{data && <Post post={data} />}</div>;
}
