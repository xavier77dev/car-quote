import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Department, EmailTemplate } from "@/interfaces";
import { useEffect, useState } from "react";

interface SelectDepartmentProps {
  setFormData: React.Dispatch<React.SetStateAction<EmailTemplate>>;
  formData: EmailTemplate;
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
  departments: Department[];
}

const SelectDepartment = ({
  setFormData,
  formData,
  departments,
  setDepartments,
}: SelectDepartmentProps) => {
  const getDepartments = async () => {
    const departments = await fetch("/api/departments");
    setDepartments(await departments.json());
  };

  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <div className="space-y-2">
      <Label htmlFor="department" className="text-gray-700">
        Departamento
      </Label>
      <Select
        onValueChange={(value: EmailTemplate["department"]) =>
          setFormData({ ...formData, department: value })
        }
      >
        <SelectTrigger className="border-gray-300">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((department) => (
            <SelectItem key={department.id} value={department.name}>
              {department.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDepartment;
