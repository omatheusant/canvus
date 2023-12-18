import NextAuth from 'next-auth/next';
import { compare } from 'bcrypt';
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
        password: { label: 'password', type: 'password'}
        
      },
      async authorize(credentials) {
        const {username, password } = credentials ?? {};
        if (!username || !password) {
          throw new Error("Usuário ou senha faltando!")
        }
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (!user || !(await compare(password, user.password))) {
          throw new Error ("Usuário ou senha inválidos!")
        }
        return user
      },
    }),
  ],
}

export default NextAuth(authOptions)

