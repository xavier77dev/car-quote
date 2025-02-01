import { Resend } from "resend";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EmailTemplate } from "@/components/EmailTemplate";
import { EmailTemplateSend } from "@/interfaces";

const resend = new Resend(process.env.API_KEY_EMAIL);

export async function POST(req: Request, res: NextResponse) {
  try {
    const body = await req.json();

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingAuto = await prisma.auto.findFirst({
      where: {
        name: body.model,
      },
    });

    if (!existingAuto) {
      return NextResponse.json(
        { message: "Auto no encontrado" },
        { status: 404 },
      );
    }

    const existingQuotation = await prisma.quotation.findMany({
      where: {
        modelId: Number(existingAuto.id),
        email: body.email,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingQuotation.length > 0) {
      return NextResponse.json(
        {
          message: "Ya existe una cotización para este usuario, modelo y dia.",
        },
        { status: 400 },
      );
    }

    const existingDepartment = await prisma.department.findFirst({
      where: {
        name: body.department,
      },
    });

    const existingCity = await prisma.city.findFirst({
      where: {
        name: body.city,
      },
    });

    if (!existingCity) {
      return NextResponse.json(
        { message: "Departamento no encontrado" },
        { status: 404 },
      );
    }

    const createQuotation = await prisma.quotation.create({
      data: {
        model: { connect: { id: Number(existingAuto.id) } },
        email: body.email,
        fullName: body.name,
        phone: body.phone,
        acceptsPolicy: body.acceptsPolicy,
        city: { connect: { id: Number(existingCity.id) } },
        department: { connect: { id: Number(body.departmentId) } },
        price: Number(existingAuto.price),
      },
    });

    const dataSendEmail: EmailTemplateSend = {
      model: body.model,
      name: body.name,
      email: body.email,
      phone: body.phone,
      department: body.department,
      city: body.city,
      price: Number(existingAuto.price),
    };

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [body.email],
      subject: "Cotización",
      react: EmailTemplate(dataSendEmail),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: createQuotation }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
