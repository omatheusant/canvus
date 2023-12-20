import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'

import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' }

      },
      async authorize(credentials) {
        const { username, password } = credentials ?? {};
        if (!username || !password) {
          throw new Error("Usuário ou senha faltando!")
        }
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (user?.password === password) {
          return user
        }
        throw new Error('Invalid credentials');
      },
    }),
  ],
  callbacks: {
    async jwt ({token, user}) {
      if(user) token.role = user.role
      return token
    },
    async session({session, token}) {
      if(session?.user) session.user.role = token.role
      return session
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login'
  }
}

export default NextAuth(authOptions)

