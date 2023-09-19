import startDB from "@/lib/db"
import UserModel from "@/models/userModel"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        await startDB()
        const user = await UserModel.findOne({ email })
        if (!user) throw Error("Email/password mismatch!")

        const passwordMatch = await user.comparePassword(password)
        if (!passwordMatch) throw Error("Email/password mismatch!")

        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
          privacy: user.privacy,
          avatar: user.avatar,
        }
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      if (params.user) {
        params.token.role = params.user.role
        params.token.id = params.user.id
        params.token.privacy = params.user.privacy
        params.token.avatar = params.user.avatar
      }
      if (params.trigger === "update" && params.session?.name) {
        params.token.name = params.session.name
      }
      if (params.trigger === "update" && params.session?.privacy) {
        params.token.privacy = params.session.privacy
      }
      return params.token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as "user" | "admin"
        session.user.privacy = token.privacy as "public" | "hidden"
        session.user.avatar = token.avatar as string
      }
      return session
    },
  },
}

const authHandler = NextAuth(authOptions)
export { authHandler as GET, authHandler as POST }
