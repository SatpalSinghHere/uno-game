
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import instagram from "next-auth/providers/instagram"
import twitter from "next-auth/providers/twitter"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, instagram, twitter],
})