import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
const ownerEmail = process.env.OWNER_EMAIL || fromEmail;

export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const safeSubject = subject || "New contact form submission";
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      subject: safeSubject,
      reply_to: email,
      html: `
        <div style="background:#f6f6f4;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#111827;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <div style="padding:20px 24px;border-bottom:1px solid #e5e7eb;">
              <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#6b7280;">New Message</div>
              <div style="font-size:20px;font-weight:700;margin-top:6px;color:#0f172a;">${safeSubject}</div>
            </div>
            <div style="padding:20px 24px;">
              <div style="margin-bottom:12px;color:#6b7280;font-size:13px;">
                <strong style="color:#111827;">From:</strong> ${email || "Unknown"}<br/>
                <strong style="color:#111827;">Submitted:</strong> ${submittedAt}
              </div>
              <div style="font-size:15px;line-height:1.6;color:#0f172a;white-space:pre-wrap;">${message || ""}</div>
            </div>
            <div style="padding:16px 24px;border-top:1px solid #e5e7eb;background:#fafafa;font-size:12px;color:#6b7280;">
              Reply directly to this email to respond.
            </div>
          </div>
        </div>
      `,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
