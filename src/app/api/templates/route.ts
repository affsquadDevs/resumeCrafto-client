import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const { name, data } = await req.json();

        if (!name || !data) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const template = await prisma.template.create({
            data: {
                name,
                data,
                userId: user.id,
                isPublic: true,
            },
        });

        return NextResponse.json({
            message: 'Template shared successfully',
            template
        });
    } catch (error: any) {
        console.error('Template save error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        let currentUserEmail = session?.user?.email;
        let userId: string | undefined;

        if (currentUserEmail) {
            const user = await prisma.user.findUnique({
                where: { email: currentUserEmail }
            });
            userId = user?.id;
        }

        // Fetch templates:
        // 1. All public templates
        // 2. Templates owned by the current user (even if private)
        const templates = await prisma.template.findMany({
            where: {
                OR: [
                    { isPublic: true },
                    { userId: userId || 'none' }
                ]
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(templates);
    } catch (error: any) {
        console.error('Template fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id, isPublic } = await req.json();

        const template = await prisma.template.findUnique({
            where: { id }
        });

        if (!template) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        // Check ownership
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (template.userId !== user?.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

        const updated = await prisma.template.update({
            where: { id },
            data: { isPublic }
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

        const template = await prisma.template.findUnique({
            where: { id }
        });

        if (!template) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        // Check ownership
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (template.userId !== user?.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

        await prisma.template.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
