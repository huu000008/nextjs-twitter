import NextAuth from 'next-auth'
import NaverProvider from 'next-auth/providers/naver'

const handler = NextAuth({
  providers: [
    NaverProvider({
      clientId: 'A6NGEtIRhMqr5_HuEjtV',
      clientSecret: 'Whzn8YEZjQ',
    }),
  ],
})

export { handler as GET, handler as POST }
