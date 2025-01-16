import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const departmentId = url.searchParams.get("departmentId");

  try {
    if (!departmentId) {
      return NextResponse.json(
        { error: "Falta el parámetro departmentId" },
        { status: 400 },
      );
    }

    const cities = await prisma.city.findMany({
      where: {
        departmentId: Number(departmentId),
      },
    });

    return NextResponse.json(cities);
  } catch (error) {
    NextResponse.json(error);
  }
}
