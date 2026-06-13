import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { agent } from "@/config/agent";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  req: NextRequest
) {

  try {

    console.log(
      "👀 VISITOR TRACKING HIT"
    );

    const body =
      await req.json();

    console.log(
      "VISITOR DATA:",
      body
    );

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
      req.headers.get(
        "x-forwarded-for"
      ) ||
      req.headers.get(
        "x-real-ip"
      ) ||
      "Unknown";

    const time =
      new Date().toLocaleString();

    const result =
      await resend.emails.send({

        from:
          `${agent.name} <noreply@obiresoffice.com>`,

        to:
          agent.email,

        subject:
          "👀 New Website Visitor",

        html: `
          <div style="font-family:Arial;padding:20px;background:#0f1115;color:white">

            <h1 style="margin-bottom:20px;">
              New Visitor Alert
            </h1>

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

    console.log(
      "✅ VISITOR EMAIL SENT:",
      result
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(
      "❌ VISITOR EMAIL FAILED:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to send email",
      },
      {
        status: 500,
      }
    );
  }
}