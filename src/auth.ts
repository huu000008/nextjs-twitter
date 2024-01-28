import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import { createPrivateKey } from 'crypto';
import { SignJWT } from 'jose';

const getAppleToken = async () => {
  const key = process.env.APPLE_PRIVATE_KEY;

  const appleToken = await new SignJWT({})
    .setAudience('https://appleid.apple.com')
    .setIssuer(process.env.NEXT_PUBLIC_APPLE_TEAM_ID!)
    .setIssuedAt(new Date().getTime() / 1000)
    .setExpirationTime(new Date().getTime() / 1000 + 3600 * 2)
    .setSubject(process.env.NEXT_PUBLIC_APPLE_ID!)
    .setProtectedHeader({
      alg: 'ES256',
      kid: process.env.NEXT_PUBLIC_APPLE_ID,
    })
    .sign(createPrivateKey(key!));
  return appleToken;
};

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
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
    AppleProvider({
      clientId: process.env.NEXT_PUBLIC_APPLE_ID,
      clientSecret: await getAppleToken(),
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async jwt(data) {
      if (data.account) {
        data.token.accessToken = data.account.access_token;
        data.token.provider = data.account.provider;
      }
      return data.token;
    },
    async session({ session, token }) {
      if (session) {
        session.accessToken = token.accessToken;
        session.provider = token.provider;
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
