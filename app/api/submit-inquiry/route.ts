import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validation
    if (!data.name || !data.company || !data.email) {
      return NextResponse.json(
        { error: "Name, company and email are required" },
        { status: 400 }
      );
    }

    // In static export, API routes won't run on the server.
    // This route is kept for local dev. In production on Cloudflare Pages static export,
    // form submissions should go directly to the Cloudflare Worker (ltcpa-inquiry-api).
    // Forward to worker if configured, or return a helpful message.
    const workerUrl = process.env.NEXT_PUBLIC_INQUIRY_API_URL;

    if (workerUrl) {
      const res = await fetch(`${workerUrl}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      return NextResponse.json(body, { status: res.status });
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry received. (Static export: configure NEXT_PUBLIC_INQUIRY_API_URL to forward to Worker)",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
