import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        // Перевірка наявності DATABASE_URL
        if (!process.env.DATABASE_URL) {
            console.error('DATABASE_URL is not set');
            return NextResponse.json(
                { message: 'Database configuration error. Please check your .env file.' },
                { status: 500 }
            );
        }

        const { email, password, name } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Missing email or password' },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: 'User created successfully', user: { id: user.id, email: user.email } },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Registration error:', error);
        console.error('Error details:', {
            message: error?.message,
            code: error?.code,
            meta: error?.meta,
            stack: error?.stack,
        });
        return NextResponse.json(
            { 
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error?.message : undefined,
                details: process.env.NODE_ENV === 'development' ? error?.code : undefined,
            },
            { status: 500 }
        );
    }
}
