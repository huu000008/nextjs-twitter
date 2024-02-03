import { http, HttpResponse, StrictResponse } from 'msw';
import { faker } from '@faker-js/faker';

function generateDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}

const randomImages = () => {
  const numImages = Math.floor(Math.random() * 5);
  const images = [];
  for (let i = 0; i < numImages; i++) {
    images.push({ id: i + 1, url: faker.image.urlPicsumPhotos() });
  }
  return images;
};

const randomUsers = () => {
  const user = {
    id: faker.lorem.word(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  };
  return user;
};

const User = [
  {
    id: faker.lorem.word(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  },
];

export const handlers = [
  http.post('/api/login', () => {
    console.log('로그인');
    return HttpResponse.json(User[1], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
      },
    });
  }),
  http.post('/api/logout', () => {
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0',
      },
    });
  }),
  http.get('/api/posts/foryou', ({ request }) => {
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json([
      {
        postId: cursor + 1,
        user: randomUsers(),
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
      {
        postId: cursor + 2,
        user: randomUsers(),
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
      {
        postId: cursor + 3,
        user: randomUsers(),
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
      {
        postId: cursor + 4,
        user: randomUsers(),
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
      {
        postId: cursor + 5,
        user: randomUsers(),
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get('/api/posts/following', ({ request }) => {
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json([
      {
        postId: cursor + 1,
        user: randomUsers(),
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
      {
        postId: cursor + 2,
        user: randomUsers(),
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
      {
        postId: cursor + 3,
        user: randomUsers(),
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
      {
        postId: cursor + 4,
        user: randomUsers(),
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
      {
        postId: cursor + 5,
        user: randomUsers(),
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
    ]);
  }),
];
