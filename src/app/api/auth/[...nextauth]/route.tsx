import NextAuth from 'next-auth'
import NaverProvider from 'next-auth/providers/naver'
import KakaoProvider from 'next-auth/providers/kakao'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from 'next-auth/providers/apple'
import { createPrivateKey } from 'crypto'
import { SignJWT } from 'jose'

export default async function auth(req: any, res: any) {
  // 애플 최초 가입일 경우 req.body에 user.name이 담겨옴
  let appleFirstInfo: any
  if (
    req?.url?.includes('callback/apple') &&
    req?.method === 'POST' &&
    req.body.user
  ) {
    appleFirstInfo = await JSON.parse(req.body.user)
  }

  const getAppleToken = async () => {
    const key = `-----BEGIN PRIVATE KEY-----\n${process.env.APPLE_PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`

    const appleToken = await new SignJWT({})
      .setAudience('https://appleid.apple.com')
      .setIssuer(process.env.APPLE_TEAM_ID)
      .setIssuedAt(new Date().getTime() / 1000)
      .setExpirationTime(new Date().getTime() / 1000 + 3600 * 2)
      .setSubject(process.env.APPLE_ID)
      .setProtectedHeader({
        alg: 'ES256',
        kid: process.env.APPLE_KEY_ID,
      })
      .sign(createPrivateKey(key))
    return appleToken
  }

  return await NextAuth(req, res, {
    // cookies: {
    //   callbackUrl: {
    //     name: `__Secure-next-auth.callback-url`,
    //     options: {
    //       httpOnly: false,
    //       sameSite: 'none',
    //       path: '/',
    //       secure: true,
    //     },
    //   },
    // },

    providers: [
      NaverProvider({
        clientId: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
      }),
      KakaoProvider({
        clientId: process.env.KAKAO_CLIENT_ID,
        clientSecret: process.env.KAKAO_CLIENT_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      AppleProvider({
        clientId: process.env.APPLE_ID,
        clientSecret: await getAppleToken(),
        profile(profile) {
          if (appleFirstInfo) {
            profile.name = `${appleFirstInfo.name.firstName} ${appleFirstInfo.name.lastName}`
          }

          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: null,
          }
        },
      }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    // callbacks: {
    //   async jwt(data) {
    //     if (data.account) {
    //       data.token.accessToken = data.account.access_token
    //       data.token.provider = data.account.provider
    //     }
    //     return data.token
    //   },
    //   async session({ session, token }) {
    //     if (session) {
    //       session.user.
    //       session.accessToken = token.accessToken
    //       session.provider = token.provider
    //       session.user.id = token.sub
    //     }
    //     return session
    //   },
    // },
  })
}
