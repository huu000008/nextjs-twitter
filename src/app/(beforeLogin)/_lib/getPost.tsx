type Props = { queryKey: [string, string] };

export const getPost = async ({ queryKey }: Props) => {
  const [_1, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`,
    {
      next: {
        tags: ['post', id],
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
