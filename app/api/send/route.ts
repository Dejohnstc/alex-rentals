import { NextResponse } from "next/server";
import { Resend } from "resend";
import { agent } from "@/config/agent";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(req: Request) {

  try {

    console.log(
      "===================================="
    );

    console.log(
      "🚀 /api/send STARTED"
    );

    const body = await req.json();

    console.log(
      "📦 APPLICATION DATA:",
      body
    );

    const tx_ref = body.tx_ref;
    const applicationId =
  tx_ref.slice(-8).toUpperCase();

    console.log(
      "🧾 TX_REF:",
      tx_ref
    );

    if (!tx_ref) {

      console.error(
        "❌ Missing transaction reference"
      );

      return NextResponse.json(
        {
          error: "Missing transaction reference",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // VERIFY FLUTTERWAVE PAYMENT
    // =========================

    console.log(
      "🔍 VERIFYING PAYMENT..."
    );

    const verify = await fetch(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );

    const verifyData =
      await verify.json();

    console.log(
      "💳 FLW VERIFY RESPONSE:",
      verifyData
    );

    const paymentStatus =
      verifyData?.data?.status;

    console.log(
      "💰 PAYMENT STATUS:",
      paymentStatus
    );

    if (
      verifyData?.status !== "success" ||
      paymentStatus !== "successful"
    ) {

      console.error(
        "❌ PAYMENT VERIFICATION FAILED"
      );

      return NextResponse.json(
        {
          error: "Payment verification failed",
          flutterwave: verifyData,
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // VALIDATE USER DATA
    // =========================

    if (
      !body.name ||
      !body.email
    ) {

      console.error(
        "❌ Missing applicant data"
      );

      return NextResponse.json(
        {
          error: "Missing applicant data",
        },
        {
          status: 400,
        }
      );
    }

    console.log(
      "✅ APPLICANT DATA VALIDATED"
    );

    // =========================
    // EMAIL TO ADMIN
    // =========================

    try {

      console.log(
        "📩 SENDING ADMIN EMAIL..."
      );

      const adminEmail =
        await resend.emails.send({

          from: `${agent.company} <noreply@obiresoffice.com>`,

          to: agent.email,

          subject:
  `🏠 New Rental Application - ${body.name}`,

          html: `
<div style="font-family:Arial,sans-serif;line-height:1.7;padding:20px;">

<div style="
background:#111827;
color:white;
padding:20px;
border-radius:12px;
margin-bottom:25px;
">

<h1 style="margin:0;">
🏠 New Rental Application
</h1>

<p style="margin-top:10px;">
Transaction Reference:
${tx_ref}
</p>

<p>
Submitted:
${new Date().toLocaleString()}
</p>

</div>

<h3>Applicant Information</h3>

<p><strong>Full Name:</strong> ${body.name || "N/A"}</p>
<p><strong>Credit Score:</strong> ${body.creditScore || "N/A"}</p>

<p><strong>Email:</strong> ${body.email || "N/A"}</p>

<p><strong>Phone:</strong> ${body.phone || "N/A"}</p>

<p><strong>Current Address:</strong> ${body.currentAddress || "N/A"}</p>

<p><strong>Move-In Date:</strong> ${body.moveInDate || "N/A"}</p>

<p><strong>Driver License State:</strong> ${body.licenseState || "N/A"}</p>

<hr/>

<h3>Rental History</h3>

<p><strong>Landlord Name:</strong> ${body.landlordName || "N/A"}</p>

<p><strong>Landlord Phone:</strong> ${body.landlordPhone || "N/A"}</p>

<p><strong>Length Of Tenancy:</strong> ${body.tenancyLength || "N/A"}</p>

<p><strong>Number Of Occupants:</strong> ${body.numberOfOccupants || "N/A"}</p>

<p><strong>Reason For Leaving:</strong></p>

<p>
${body.reasonLeaving || "N/A"}
</p>

<hr/>

<h3>Employment Information</h3>

<p><strong>Occupation:</strong> ${body.occupation || "N/A"}</p>

<p><strong>Employer:</strong> ${body.employer || "N/A"}</p>

<p><strong>Monthly Income:</strong> ${body.income || "N/A"}</p>

<p><strong>Credit Score:</strong> ${body.creditScore || "N/A"}</p>

<hr/>

<h3>Additional Information</h3>

<p><strong>Pets:</strong> ${body.pets || "None"}</p>

<p><strong>Previous Evictions:</strong> ${body.evicted || "No"}</p>

<p><strong>Eviction Explanation:</strong></p>

<p>
${body.evictionReason || "N/A"}
</p>

<hr/>

<h3>Emergency Contact</h3>

<p><strong>Name:</strong> ${body.emergencyName || "N/A"}</p>

<p><strong>Phone:</strong> ${body.emergencyPhone || "N/A"}</p>

<p><strong>Address:</strong> ${body.emergencyAddress || "N/A"}</p>

<hr/>

<h3>Payment Information</h3>

<p><strong>Transaction Reference:</strong> ${tx_ref}</p>

<p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>

</div>
`,
 });

      console.log(
        "✅ ADMIN EMAIL SENT:",
        adminEmail
      );

    } catch (adminError) {

      console.error(
        "❌ ADMIN EMAIL FAILED:",
        adminError
      );
    }

    // =========================
    // EMAIL TO APPLICANT
    // =========================

    try {

      console.log(
        "📩 SENDING APPLICANT EMAIL..."
      );

      const applicantEmail =
        await resend.emails.send({

          from: `${agent.company} <noreply@obiresoffice.com>`,

          to: body.email,

          subject:
           
  `Rental Application Received – Review In Progress`,

          html: `
            <div style="font-family:Arial,sans-serif;line-height:1.6">

              <h2>Application Received</h2>

              <p>
                Hi ${body.name},
              </p>

              <p>
  Thank you for taking the time to complete your rental application and submit your application fee.
  We have successfully received your information and your application has now been forwarded to the landlord for review.
</p>

<p>
  The landlord is currently reviewing your rental history, income information,
  employment details, and other application materials as part of the approval process.
  We appreciate your patience while this review is being completed.
</p>
<p>
Most applications are reviewed within 24–72 hours.
If additional information is required,
we will contact you directly by email.
</p>
<p>
  <strong>A quick question from the landlord:</strong>
</p>

<p>
  Have you ever had a late rent payment, missed rent payment, lease violation,
  or payment arrangement with a previous landlord?
</p>

<p>
  If your answer is yes, please reply to this email with a detailed explanation,
  including when the situation occurred, the reason for the late payment,
  and whether the matter was fully resolved.
</p>

<p>
  Providing this information promptly may help prevent delays during the review process.
</p>

              <div style="background:#f5f5f5;padding:15px;border-radius:8px;margin-top:15px">

                <p><strong>Application Summary:</strong></p>

                <p>Name: ${body.name}</p>

                <p>Email: ${body.email}</p>

                <p>Phone: ${body.phone || "N/A"}</p>
                <p>
<strong>Application ID:</strong>
${applicationId}
</p>

              </div>

              <p style="margin-top:20px">
                If you have questions, simply reply to this email.
              </p>

              <p>
                — ${agent.name}<br/>
                ${agent.company}
              </p>

            </div>
          `,
        });

      console.log(
        "✅ APPLICANT EMAIL SENT:",
        applicantEmail
      );

    } catch (applicantError) {

      console.error(
        "❌ APPLICANT EMAIL FAILED:",
        applicantError
      );
    }

    console.log(
      "🎉 APPLICATION PROCESS COMPLETE"
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(
      "💥 SEND ROUTE CRASHED:",
      error
    );

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}