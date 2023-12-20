import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials'

import prisma from '@/lib/prisma';
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions = {
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
        if (user.password === password) {
          return user
        }
        throw new Error('Invalid credentials');
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
}

export default NextAuth(authOptions)

