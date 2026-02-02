import { NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { urls } = body;

        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return NextResponse.json(
                { error: "Invalid URL list provided" },
                { status: 400 }
            );
        }

        const success = await submitToIndexNow(urls);

        if (success) {
            return NextResponse.json({ message: "URLs submitted to IndexNow" });
        } else {
            return NextResponse.json(
                { error: "Failed to submit to IndexNow" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("IndexNow API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
