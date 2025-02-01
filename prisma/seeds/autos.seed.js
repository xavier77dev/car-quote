const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const autos = [
    {
      name: "Toyota Corolla",
      price: 20000.0,
      image:
        "https://www.toyotaperu.com.pe/sites/default/files/CorollaHybrid-gris_0.png",
      speed: "120 km/h",
      acceleration: "10 s",
      maxSpeed: "180 km/h",
    },
    {
      name: "Honda Civic",
      price: 22000.0,
      image:
        "https://www.honda.mx/web/img/cars/models/civic/2025/colors/plata.png",
      speed: "125 km/h",
      acceleration: "9.8 s",
      maxSpeed: "190 km/h",
    },
    {
      name: "Ford Mustang",
      price: 30000.0,
      image:
        "https://vehicle-images.dealerinspire.com/36f8-110004390/1FA6P8CF5N5122518/b416afd87e473bf25c2992c842b43f81.jpg",
      speed: "150 km/h",
      acceleration: "7 s",
      maxSpeed: "240 km/h",
    },
    {
      name: "Chevrolet Camaro",
      price: 35000.0,
      image:
        "https://st1.uvnimg.com/dims4/default/0f4dfa7/2147483647/thumbnail/1024x576/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fb5%2Fee%2F32d8d86f4e138c2ca6cde1d53e17%2Fcamaro-2016-transformers5.jpg",
      speed: "140 km/h",
      acceleration: "8 s",
      maxSpeed: "230 km/h",
    },
    {
      name: "BMW 3 Series",
      price: 45000.0,
      image:
        "https://bmw-laxmi.com.np/assets/frontend/images/all-models/3-series/inform/cosySec2.png",
      speed: "130 km/h",
      acceleration: "9 s",
      maxSpeed: "210 km/h",
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
          image: auto.image,
          speed: auto.speed,
          acceleration: auto.acceleration,
          maxSpeed: auto.maxSpeed,
        },
      });
    }
  }

  console.log("Autos creados:", autos);
}

main()
  .catch((e) => {
    console.error("Error:", e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
