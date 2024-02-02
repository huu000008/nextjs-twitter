type Props = { pageParam?: number };
export async function getPostsForYou({ pageParam }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/foryou?cursor=${pageParam}`,
    {
      next: {
        tags: ['posts', 'foryou'],
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
