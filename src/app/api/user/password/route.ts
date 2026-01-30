import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { currentPassword, newPassword } = body;

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: 'Missing passwords' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user || !user.password) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { email: session.user.email },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: 'Password updated successfully' });
    } catch (error: any) {
        console.error('Password POST error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
