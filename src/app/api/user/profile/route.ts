import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                usage: true,
                language: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error: any) {
        console.error('Profile GET error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { name, usage, language, image } = body;

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name,
                usage,
                language,
                image,
            },
        });

        return NextResponse.json({
            message: 'Profile updated successfully',
            user: {
                name: updatedUser.name,
                usage: updatedUser.usage,
                language: updatedUser.language,
            },
        });
    } catch (error: any) {
        console.error('Profile POST error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
