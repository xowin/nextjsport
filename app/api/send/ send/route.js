import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST() {
  try {
    const data = await resend.send({
      from: fromEmail,
      to: [""],
      subject: "Hello from Resend",
      react: (
        <>
          <p>Email Body</p>
        </>
      ),
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.error({ error });
  }
}
