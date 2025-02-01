"use client";

import { SelectCityProps } from "@/components/SelectCity";
import { City, Department, EmailTemplate, ErrorsState } from "@/interfaces";
import { useEffect, useState } from "react";

export const useSelectCity = ({
  setFormData,
  formData,
  departments,
  setErrors,
  errors,
}: SelectCityProps) => {
  const [cities, setCities] = useState<City[]>([]);

  const getCities = async (department: EmailTemplate["department"]) => {
    const findDepartmentId = departments.find((dep) => dep.name === department);

    if (findDepartmentId === undefined) {
      return;
    }

    try {
      const response = await fetch(
        `/api/cities?departmentId=${findDepartmentId.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Error al obtener ciudades");
      }

      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (formData.department !== "") {
      getCities(formData.department);
      setFormData({
        ...formData,
        city: "",
      });
    }
  }, [formData.department]);

  const handleCityChange = (value: string) => {
    const findDepartmentId = departments.find(
      (dep) => dep.name === formData.department,
    );
    setFormData((prev) => ({
      ...prev,
      city: value,
      departmentId: findDepartmentId?.id.toString(),
    }));

    setErrors((prev) => ({
      ...prev,
      city: {
        ...prev.city,
        status: value.trim().length > 0,
        message:
          value.trim().length > 0 ? "" : "Por favor selecciona un ciudad",
      },
    }));
  };

  return {
    handleCityChange,
    cities,
  };
};
