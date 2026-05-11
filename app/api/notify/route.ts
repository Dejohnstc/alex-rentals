import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      browser,
      platform,
      language,
      page,
      referrer,
      screen,
      timezone,
    } = body;

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "Unknown";

    const time = new Date().toLocaleString();

    await resend.emails.send({
      from: "Alex Rentals <noreply@obiresoffice.com>",
      to: "alexsobieskki@gmail.com",
      subject: "👀 New Website Visitor",
      html: `
        <div style="font-family:Arial;padding:20px;background:#0f1115;color:white">
          
          <h1 style="margin-bottom:20px;">New Visitor Alert</h1>

          <div style="background:#151821;padding:20px;border-radius:12px">

            <p><strong>🌍 Page:</strong> ${page}</p>
            <p><strong>🖥 Browser:</strong> ${browser}</p>
            <p><strong>📱 Device:</strong> ${platform}</p>
            <p><strong>🌐 Language:</strong> ${language}</p>
            <p><strong>📺 Screen:</strong> ${screen}</p>
            <p><strong>🕒 Timezone:</strong> ${timezone}</p>
            <p><strong>🔗 Referrer:</strong> ${referrer || "Direct Visit"}</p>
            <p><strong>📍 IP:</strong> ${ip}</p>
            <p><strong>⏰ Time:</strong> ${time}</p>

          </div>

        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}