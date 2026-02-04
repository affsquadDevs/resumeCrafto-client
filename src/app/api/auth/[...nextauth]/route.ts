import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma as any),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
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
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google' && (profile as any)?.picture && !user.image) {
                try {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { image: (profile as any).picture },
                    });
                } catch (error) {
                    console.error('Error updating user image from Google:', error);
                }
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
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
    debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
