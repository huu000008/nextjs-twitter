import NextAuth, { AuthOptions } from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import { createPrivateKey } from 'crypto';
import { SignJWT } from 'jose';

export const authOption: AuthOptions = {
  cookies: {
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: false,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },
  providers: [
    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      //user : provier return value
      return token;
    },

    async session({ session, token }: any) {
      //token : jwt return value
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const auth = async (req: any, res: any) => {
  // authOption을 따로 만들지 않으면 getAppleToken 생성시 es2017 불필요. (async/await 사용)
  // 굳이 authOption을 객체로 따로 둔 이유는 아래에 설명
  return await NextAuth(req, res, authOption);
};
