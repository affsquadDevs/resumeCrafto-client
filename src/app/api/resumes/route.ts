import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { submitToIndexNow } from '@/lib/indexnow';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                resumes: {
                    orderBy: { updatedAt: 'desc' }
                }
            }
        });

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        return NextResponse.json(user.resumes);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id, name, data } = await req.json();

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        if (id) {
            // Update existing
            const resume = await prisma.resume.update({
                where: { id },
                data: {
                    name: name || 'Untitled Resume',
                    data
                }
            });

            // Trigger IndexNow (fire and forget)
            submitToIndexNow([`https://resumecraftor.com/resume/${resume.id}`]).catch(err =>
                console.error("Failed to submit to IndexNow:", err)
            );

            return NextResponse.json(resume);
        } else {
            // Create new
            const count = await prisma.resume.count({ where: { userId: user.id } });
            const resume = await prisma.resume.create({
                data: {
                    name: name || 'Untitled Resume',
                    data,
                    userId: user.id
                }
            });

            // Trigger IndexNow
            submitToIndexNow([`https://resumecraftor.com/resume/${resume.id}`]).catch(err =>
                console.error("Failed to submit to IndexNow:", err)
            );

            const isFirst = count === 0;
            return NextResponse.json({ ...resume, isFirst });
        }
    } catch (error) {
        console.error('Resume save error:', error);
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

        const resume = await prisma.resume.findUnique({
            where: { id }
        });

        if (!resume) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (resume.userId !== user?.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

        await prisma.resume.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
