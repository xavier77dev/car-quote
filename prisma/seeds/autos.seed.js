const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const autos = [
    {
      name: "Toyota Corolla",
      price: 20000.0,
    },
    {
      name: "Honda Civic",
      price: 22000.0,
    },
    {
      name: "Ford Mustang",
      price: 30000.0,
    },
    {
      name: "Chevrolet Camaro",
      price: 35000.0,
    },
    {
      name: "BMW 3 Series",
      price: 45000.0,
    },
  ];

  for (const auto of autos) {
    const existingAuto = await prisma.auto.findFirst({
      where: {
        name: auto.name,
      },
    });
    if (!existingAuto) {
      await prisma.auto.create({
        data: {
          name: auto.name,
          price: auto.price,
        },
      });
    }
  }

  console.log("Autos creados:", autos);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
