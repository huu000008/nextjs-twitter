export async function getPostsForYou() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/foryou`,
    {
      next: {
        tags: ['posts', 'foryou'],
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
