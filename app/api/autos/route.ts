import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const autos = await prisma.auto.findMany();

    return NextResponse.json(autos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los autos" },
      { status: 500 },
    );
  }
}
