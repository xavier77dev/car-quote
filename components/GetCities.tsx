import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { City, Department, EmailTemplate } from "@/interfaces";
import { useEffect, useState } from "react";

interface FindCitiesXDepartmentProps {
  setFormData: React.Dispatch<React.SetStateAction<EmailTemplate>>;
  formData: EmailTemplate;
  departments: Department[];
}

const FindCitiesXDepartment = ({
  setFormData,
  formData,
  departments,
}: FindCitiesXDepartmentProps) => {
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

  return (
    <div className="space-y-2">
      <Label htmlFor="city" className="text-gray-700">
        Ciudad
      </Label>
      <Select
        onValueChange={(value) =>
          setFormData({
            ...formData,
            city: value,
          })
        }
        value={formData.city}
      >
        <SelectTrigger className="border-gray-300">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city.id} value={city.name}>
              {city.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FindCitiesXDepartment;
