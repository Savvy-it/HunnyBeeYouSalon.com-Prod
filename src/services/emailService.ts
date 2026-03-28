import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, html } = req.body;

  if (!process.env.RESEND_API_KEY) {
    console.log('Demo mode: Email would be sent to', to, 'with subject', subject);
    return res.status(200).json({ success: true, demo: true });
  }

  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: to,
      subject: subject,
      html: html,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
}
