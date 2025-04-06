import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

let users = [];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find(
          (user) => user.email === credentials.email && user.password === credentials.password
        );
        if (user) {
          return user; 
        } else {
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/general/login',  
    signOut: '/general/logout', 
    newUser: '/general/profile', 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
