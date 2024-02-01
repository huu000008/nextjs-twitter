export async function getPostsFollowing() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/following`,
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
