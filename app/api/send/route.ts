import { EmailTemplate } from "../../../components/email-template";
import { Resend } from "resend";
import { data as dataField } from "../../../lib/data";
import { EmailTemplateProps } from "@/interfaces";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const resend = new Resend("re_NmkwQcSx_4rNcs2h57g8A9WAETgHoWvMt");

export async function POST(req: Request, res: NextResponse) {
  try {
    const body = await req.json();
    const { model, email } = body;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingQuotation = await prisma.quotation.findMany({
      where: {
        modelCar: model,
        email: email,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingQuotation.length > 0) {
      return NextResponse.json(
        {
          message: "Ya existe una cotización para este usuario, modelo y día.",
        },
        { status: 400 },
      );
    }

    await prisma.quotation.create({
      data: {
        modelCar: model,
        email,
        fullName: body.name,
        phone: body.phone,
        acceptsPolicy: body.acceptsPolicy,
        cityId: body.cityId,
      },
    });

    const findDataField: EmailTemplateProps = dataField.filter(
      (data) => body.model == data.model,
    )[0];

    if (findDataField == undefined) {
      return NextResponse.json("The model is not found", { status: 404 });
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
