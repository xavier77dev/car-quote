import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const departments = await prisma.department.findMany();

    return NextResponse.json(departments);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los departamentos" },
      { status: 500 },
    );
  }
}
