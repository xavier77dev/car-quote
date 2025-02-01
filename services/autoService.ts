import { Auto } from "@prisma/client";

export const fetchAutos = async (): Promise<Auto[]> => {
  const response = await fetch("/api/autos");
  return response.json();
};
