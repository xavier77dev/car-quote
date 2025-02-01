"use client";

import { useAutoStore } from "@/stores/carStore";
import { motion } from "framer-motion";
import Image from "next/image";

export const FeatureCar = () => {
  const { auto } = useAutoStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="relative"
    >
      <Image
        src={auto.image!}
        alt={auto.name}
        width={800}
        height={600}
        className="rounded-lg shadow-2xl object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-lg" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-4 left-4 right-4 flex justify-around bg-black/60 backdrop-blur-sm rounded-lg p-4"
      >
        {["360HP", "0-100 4.5s", "250km/h"].map((feature, index) => (
          <div key={index} className="text-center text-white">
            <div className="font-bold">{feature}</div>
            <div className="text-xs opacity-75">
              {index === 0
                ? "Potencia"
                : index === 1
                  ? "Aceleración"
                  : "Velocidad Máx"}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};
