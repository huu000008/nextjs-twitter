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
const User = [
  { id: 'USER01', nickname: 'USERNICKNAME01', image: faker.image.avatar() },
  { id: 'USER02', nickname: 'USERNICKNAME02', image: faker.image.avatar() },
  { id: 'USER03', nickname: 'USERNICKNAME03', image: faker.image.avatar() },
];
const Posts = [
  {
    postId: 1,
    user: User[0],
    content: faker.lorem.lines({ min: 1, max: 3 }),
    imgUrl: faker.image.urlLoremFlickr(),
    createdAt: generateDate(),
  },
  {
    postId: 2,
    user: User[2],
    content: faker.lorem.lines({ min: 1, max: 3 }),
    imgUrl: faker.image.urlLoremFlickr(),
    createdAt: generateDate(),
  },
  {
    postId: 3,
    user: User[3],
    content: faker.lorem.lines({ min: 1, max: 3 }),
    imgUrl: faker.image.urlLoremFlickr(),
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
    console.log('로그아웃');
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0',
      },
    });
  }),
  http.get('/api/posts', () => {
    return HttpResponse.json(Posts);
  }),
];
