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
  const numImages = Math.floor(Math.random() * 5); // 0에서 4까지의 랜덤한 숫자 생성
  const images = [];
  for (let i = 0; i < numImages; i++) {
    images.push({ id: i + 1, url: faker.image.urlPicsumPhotos() });
  }
  return images;
};

const User = [
  { id: 'USER01', name: faker.person.fullName(), image: faker.image.avatar() },
  { id: 'USER02', name: faker.person.fullName(), image: faker.image.avatar() },
  { id: 'USER03', name: faker.person.fullName(), image: faker.image.avatar() },
  { id: 'USER04', name: faker.person.fullName(), image: faker.image.avatar() },
  { id: 'USER05', name: faker.person.fullName(), image: faker.image.avatar() },
];
const Following = [
  {
    postId: 1,
    user: User[4],
    content: faker.lorem.lines({ min: 1, max: 10 }),
    images: randomImages(),
    createdAt: generateDate(),
  },
  {
    postId: 2,
    user: User[0],
    content: faker.lorem.lines({ min: 1, max: 10 }),
    images: [],
    createdAt: generateDate(),
  },
  {
    postId: 3,
    user: User[1],
    content: faker.lorem.lines({ min: 1, max: 10 }),
    images: randomImages(),
    createdAt: generateDate(),
  },
  {
    postId: 4,
    user: User[3],
    content: faker.lorem.lines({ min: 1, max: 10 }),
    images: randomImages(),
    createdAt: generateDate(),
  },
  {
    postId: 5,
    user: User[2],
    content: faker.lorem.lines({ min: 1, max: 10 }),
    images: randomImages(),
    createdAt: generateDate(),
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
        user: User[0],
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
      {
        postId: cursor + 2,
        user: User[1],
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
      {
        postId: cursor + 3,
        user: User[2],
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
      {
        postId: cursor + 4,
        user: User[3],
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
      {
        postId: cursor + 5,
        user: User[4],
        content: faker.lorem.lines({ min: 1, max: 10 }),
        images: randomImages(),
        createdAt: generateDate(),
      },
    ]);
  }),
  http.get('/api/posts/following', () => {
    console.log('b');
    return HttpResponse.json(Following);
  }),
];
