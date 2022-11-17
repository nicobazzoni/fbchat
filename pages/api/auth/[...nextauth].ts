import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
],
    // ...add more providers here
    secret: process.env.NEXTAUTH_SECRET!,
    pages: { 
        signIn: '/auth/signin',
    }

}

export default NextAuth(authOptions)

//FACEBOOK_CLIENT_ID=3119512991672887
//FACEBOOK_CLIENT_SECRET=e15116d2c0ced6b32edbf898a919969f