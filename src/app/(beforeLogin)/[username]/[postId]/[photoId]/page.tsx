import ModalPhoto from '@/app/(beforeLogin)/@modal/(.)[username]/[postId]/[photoId]/page';
import React from 'react';

type Props = {
  params: any;
};

export default function page({ params }: Props) {
  return <ModalPhoto params={params} />;
}
