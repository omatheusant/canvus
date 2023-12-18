import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';


export const authOptions = {
  providers: [
    CredentialsProvider({
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
    signIn: '/login'
  }
}

export default NextAuth(authOptions)

