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

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Convert to Base64 Data URI
        const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Save to Database
        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: { image: base64Image }
        });

        return NextResponse.json({
            message: 'Image uploaded successfully',
            imageUrl: updatedUser.image
        });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE() {
    return NextResponse.json({ message: 'Ready for removal' });
}
