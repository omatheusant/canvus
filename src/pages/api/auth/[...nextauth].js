import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';


export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
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
  pages: {
    signIn: '/auth/signin',
  },
}

export default NextAuth(authOptions)

