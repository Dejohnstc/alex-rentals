import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const tx_ref = body.tx_ref;

    if (!tx_ref) {
      return NextResponse.json(
        { error: "Missing transaction reference" },
        { status: 400 }
      );
    }

    // ✅ VERIFY PAYMENT
    const verify = await fetch(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );

    const verifyData = await verify.json();

    console.log("FLW VERIFY:", verifyData);

    // ✅ SAFE CHECK
    const paymentStatus = verifyData?.data?.status;

    if (
      verifyData?.status !== "success" ||
      paymentStatus !== "successful"
    ) {
      return NextResponse.json(
        {
          error: "Payment verification failed",
          flutterwave: verifyData,
        },
        { status: 400 }
      );
    }

    // =========================
    // 📩 EMAIL TO ADMIN
    // =========================
    await resend.emails.send({
      from: "Alex Sobieski <noreply@obiresoffice.com>",
      to: "alexsobieskki@gmail.com",
      subject: "New Rental Application",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
          <h2>New Rental Application</h2>

          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Occupation:</strong> ${body.occupation}</p>
          <p><strong>Monthly Income:</strong> ${body.income}</p>

          <hr />

          <p><strong>Transaction Ref:</strong> ${tx_ref}</p>
        </div>
      `,
    });

    // =========================
    // 📩 EMAIL TO APPLICANT
    // =========================
    await resend.emails.send({
      from: "Alex Sobieski <noreply@obiresoffice.com>",
      to: body.email,
      subject: "Application Received - Alex Rentals",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
          <h2>Application Received</h2>

          <p>Hi ${body.name},</p>

          <p>
            Thank you for submitting your rental application.
            Your application fee has been received successfully.
          </p>

          <p>
            Our team will review your application and contact you shortly.
          </p>

          <div style="background:#f5f5f5; padding:15px; border-radius:8px; margin-top:15px;">
            <p><strong>Application Summary:</strong></p>

            <p>Name: ${body.name}</p>
            <p>Email: ${body.email}</p>
            <p>Phone: ${body.phone}</p>
          </div>

          <p style="margin-top:20px;">
            If you have questions, simply reply to this email.
          </p>

          <p>
            — Alex Sobieski<br/>
            Alex Rentals
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error("SEND ERROR:", error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}