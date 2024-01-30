'use client';

import Image from 'next/image';
import { getPosts } from '../_lib/getPosts';
import { useQuery } from '@tanstack/react-query';

export default function Post() {
  const { data } = useQuery({
    queryKey: ['get', 'posts'],
    queryFn: getPosts,
  });
  console.log(data);
  return (
    <>
      {data.map((item: any) => (
        <div key={item.postId}>
          <p>{item.content}</p>
          <Image src={item.imgUrl} alt="img" width={40} height={40} />;
        </div>
      ))}
    </>
  );
}
