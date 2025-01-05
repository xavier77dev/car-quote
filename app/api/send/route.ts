import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';

const resend = new Resend('re_T45cCQy2_HPbYgdXZ9yipVTDv36WpzQy8');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const { data, error } = await resend.emails.send({
      from: 'PDF Test <pedro.angel.vd@resend.dev>',
      to: [body.email],
      subject: 'Esto es una prueba',
      react: EmailTemplate(),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
