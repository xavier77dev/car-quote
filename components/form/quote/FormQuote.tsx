"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import SelectDepartment from "../../SelectDepartment";
import SelectCity from "../../SelectCity";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFormQuote } from "./hooks/useFormQuote";

export const FormQuote = () => {
  const {
    handleSubmit,
    autos,
    departments,
    setDepartments,
    formData,
    setFormData,
    errors,
    setErrors,
  } = useFormQuote();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        ¡Cotiza tu nuevo vehículo!
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="space-y-2">
          <Label htmlFor="model" className="text-gray-700">
            Selecciona un modelo{" "}
            <span className="text-red-600 text-sm"> *</span>
          </Label>
          <Select
            onValueChange={(value) => {
              const updatedFormData = {
                ...formData,
                model: value,
              };
              if (value.trim() !== "") {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  model: { ...prevErrors.model, status: false },
                }));
              }
              setFormData(updatedFormData);
            }}
          >
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Elige un modelo" />
            </SelectTrigger>
            <SelectContent>
              {autos!.map((auto) => (
                <SelectItem key={auto.id} value={auto.name}>
                  {auto.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-red-600 text-[14px]">
            {errors.model.status && errors.model.message}
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700">
            Nombre completo <span className="text-red-600"> *</span>
          </Label>
          <Input
            onChange={(e) => {
              const updatedFormData = {
                ...formData,
                name: e.target.value,
              };
              if (e.target.value.trim() === "") {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  name: { ...prevErrors.name, status: true },
                }));
              } else {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  name: { ...prevErrors.name, status: false },
                }));
              }

              setFormData(updatedFormData);
            }}
            id="name"
            placeholder="Tu nombre"
            className="border-gray-300"
          />
          <span className="text-red-600 text-sm">
            {errors.name.status && errors.name.message}
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            Email <span className="text-red-600"> *</span>
          </Label>
          <Input
            value={formData.email}
            id="email"
            type="email"
            placeholder="tu@email.com"
            className="border-gray-300"
            formNoValidate
            onChange={(e) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              const updatedFormData = {
                ...formData,
                email: e.target.value,
              };
              if (
                e.target.value.trim() == "" ||
                !emailRegex.test(e.target.value)
              ) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  email: { ...prevErrors.email, status: true },
                }));
              } else if (e.target.value.trim().length > 0) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  email: { ...prevErrors.email, status: false },
                }));
              }
              setFormData(updatedFormData);
            }}
          />

          <span className="text-red-600 text-sm">
            {errors.email.status && errors.email.message}
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-700">
            Número celular
          </Label>
          <Input
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            id="phone"
            type="tel"
            placeholder="Tu número de contacto"
            className="border-gray-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectDepartment
            setFormData={setFormData}
            setDepartments={setDepartments}
            departments={departments}
            setErrors={setErrors}
            errors={errors}
          />
          <SelectCity
            setFormData={setFormData}
            formData={formData}
            departments={departments}
            setErrors={setErrors}
            errors={errors}
          />
          <span className="text-red-600 text-sm"></span>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.acceptsPolicy}
            onCheckedChange={(checked: boolean) => {
              if (checked) {
                setErrors((prev) => ({
                  ...prev,
                  aceptsPolicy: {
                    ...prev.aceptsPolicy,
                    status: !checked,
                  },
                }));
              }

              setFormData((prev) => ({
                ...prev,
                acceptsPolicy: checked,
              }));
            }}
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Acepto la Política de Tratamiento de Datos{" "}
            <span className="text-red-600"> *</span>
          </label>
        </div>
        <span className="text-red-600 text-sm mt-1">
          {errors.aceptsPolicy.status && errors.aceptsPolicy.message}
        </span>

        <Button
          className="w-full bg-gray-800 hover:bg-gray-700 text-white"
          size="lg"
        >
          Enviar datos
        </Button>
      </form>
    </motion.div>
  );
};
