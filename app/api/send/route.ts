import { EmailTemplate } from "../../../components/email-template";
import { Resend } from "resend";
import { data as dataField } from "../../../lib/data";
import { EmailTemplateProps } from "@/interfaces";

const resend = new Resend("re_NmkwQcSx_4rNcs2h57g8A9WAETgHoWvMt");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const findDataField: EmailTemplateProps = dataField.filter(
      (data) => body.model == data.model,
    )[0];

    if (findDataField == undefined) {
      return Response.json("The model is not found", { status: 404 });
    }

    const { data, error } = await resend.emails.send({
      from: "PDF Test <pedro.angel.vd@resend.dev>",
      to: [body.email],
      subject: "Esto es una prueba",
      react: EmailTemplate(findDataField),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
