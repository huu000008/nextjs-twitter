import { auth } from '@/auth'; // 단순히 파일 분리

const handler = auth;

export { handler as GET, handler as POST };
