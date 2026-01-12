import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";
import { ApiPromise } from "@/types/ApiPromise";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailVerificationProps = {
  email: string;
  username: string;
  OTP: string;
};

export async function SendEmailVerification({
  email,
  username,
  OTP,
}: SendEmailVerificationProps): Promise<ApiPromise> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification Code",
      react: EmailTemplate({ username, OTP }),
    });

    if (error) {
      return { success: false, message: "Failed to send verification email" };
    }

    return { success: true, message: "Verification Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Internal server error during email" };
  }
}
