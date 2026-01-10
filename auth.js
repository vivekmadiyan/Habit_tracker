import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',  // Custom login page
  },
  callbacks: {
    async session({ session, token }) {
      // Add user ID to session if needed
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};