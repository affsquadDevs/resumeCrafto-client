import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { submitToIndexNow } from "@/lib/indexnow";

// Triggered daily by Vercel Cron (see vercel.json). Reads the canonical
// sitemap and pings IndexNow so new/changed pages reach Bing/Yandex without
// anyone remembering to submit them manually. Idempotent — IndexNow dedupes,
// so resubmitting the full sitemap each day is harmless.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    // Vercel automatically sends `Authorization: Bearer <CRON_SECRET>` when the
    // CRON_SECRET env var is set. Enforce it when present; otherwise stay open
    // (the action only submits our own public sitemap, so it is low-risk).
    const authHeader = request.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const urls = sitemap().map((entry) => entry.url);

    if (urls.length === 0) {
        return NextResponse.json({ ok: false, submitted: 0, error: "Empty sitemap" }, { status: 500 });
    }

    const ok = await submitToIndexNow(urls);

    return NextResponse.json(
        { ok, submitted: ok ? urls.length : 0 },
        { status: ok ? 200 : 502 }
    );
}
