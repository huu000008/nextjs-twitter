type Props = { pageParam?: number };
export async function getPostsFollowing({ pageParam }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/following?cursor=${pageParam}`,
    {
      next: {
        tags: ['posts', 'following'],
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
