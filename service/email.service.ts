import { resend } from "@/lib/resend/resend";

export const emailService = () => ({
  sendEmail: async (
    to: string[],
    subject: string,
    body: string,
  ): Promise<void> => {
    await resend.emails.send({
      //from: process.env.RESEND_EMAIL_SENDER!,
      from: "The Watcher <onboarding@resend.dev>",
      to,
      subject,
      html: body,
    });
  },
});
