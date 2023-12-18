import NextAuth from 'next-auth/next';
import prisma from '@/lib/prisma';
import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials'


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password'}
        
      },
      async authorize(credentials) {
        const user = { id: '1', name: 'Ismafer Ferramentas', username: 'ismafer', password: 'admin123' }

        if (user &&
          user?.username === credentials?.username &&
          user?.password === credentials?.password) {
          return user
        }
        throw new Error('Usuário ou senha inválido')
      }
    })
  ],
}

export default NextAuth(authOptions)

