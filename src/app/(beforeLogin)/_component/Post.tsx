'use client';

import Image from 'next/image';
import { getPosts } from '../_lib/getPosts';
import { useQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/app/model/Post';

export default function Post() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['get', 'posts'],
    queryFn: getPosts,
  });
  console.log(data);
  return (
    <>
      {data?.map((item: IPost) => {
        <>
          a
          <Image src={item.imgUrl} alt="img" width={40} height={40} />;
        </>;
      })}
    </>
  );
}
