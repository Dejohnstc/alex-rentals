import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  await resend.emails.send({
    from: "noreply@obiresoffice.com",
    to: "alexsobieskki@gmail.com",
    subject: "New Rental Application",
    text: `
Name: ${body.name}
Email: ${body.email}
Phone: ${body.phone}
Income: ${body.income}
    `,
  });

  return NextResponse.json({ success: true });
}