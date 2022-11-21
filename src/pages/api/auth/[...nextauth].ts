import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { api } from '../../../lib/axios';

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ], 
  
  callbacks: {
    async session({ session, token }) {
      const access_token = token.accessToken;
      try{
        const tokenResponse = await api.post('/users', { access_token })
        return{
          ...session,
          token_response: tokenResponse.data.token
        }
  
      } catch (err) {
        console.log(err)
        throw err
        
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
  },
  secret: process.env.JWT_SECRET
})
