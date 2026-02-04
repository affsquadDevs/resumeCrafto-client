import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma as any),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.password) {
                    throw new Error('No user found');
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    throw new Error('Incorrect password');
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                // ONLY store the ID in the token to keep it small.
                // authorize() might return a huge object (e.g. base64 image),
                // but we must not let that get into the JWT cookie.
                return {
                    id: user.id
                };
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.id) {
                (session.user as any).id = token.id;

                try {
                    const user = await prisma.user.findUnique({
                        where: { id: token.id as string },
                    });

                    if (user) {
                        session.user.image = user.image;
                        session.user.name = user.name;
                        session.user.email = user.email;
                        (session.user as any).usage = user.usage;
                        (session.user as any).language = user.language;
                    }
                } catch (error) {
                    console.error('Error fetching fresh user data:', error);
                }
            }
            return session;
        },
    },
    cookies: {
        sessionToken: {
            name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            },
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/', // We use modals on home page
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
