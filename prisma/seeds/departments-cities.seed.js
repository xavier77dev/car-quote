import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const departments = [
  {
    name: "Amazonas",
    cities: [{ name: "Chachapoyas" }, { name: "Bagua" }, { name: "Utcubamba" }],
  },
  {
    name: "Áncash",
    cities: [{ name: "Huaraz" }, { name: "Chimbote" }, { name: "Caraz" }],
  },
  {
    name: "Apurímac",
    cities: [{ name: "Abancay" }, { name: "Andahuaylas" }],
  },
];

async function main() {
  for (const department of departments) {
    const existingDepartment = await prisma.department.findUnique({
      where: { name: department.name },
    });
    if (!existingDepartment) {
      await prisma.department.create({
        data: {
          name: department.name,
          cities: {
            create: department.cities,
          },
        },
      });
    }
  }
  console.log("Seed data successfully added!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
