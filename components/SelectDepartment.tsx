"use client";

import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSelectDepartment } from "@/hooks/use-select-department";
import { Department, EmailTemplate, ErrorsState } from "@/interfaces";

interface SelectDepartmentProps {
  setFormData: React.Dispatch<React.SetStateAction<EmailTemplate>>;
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
  departments: Department[];
  setErrors: React.Dispatch<React.SetStateAction<ErrorsState>>;
  errors: ErrorsState;
}

const SelectDepartment = ({
  setFormData,
  departments,
  setDepartments,
  setErrors,
  errors,
}: SelectDepartmentProps) => {
  const { handleDepartmentChange } = useSelectDepartment({
    setFormData,
    setDepartments,
    setErrors,
  });

  return (
    <div className="space-y-2">
      <Label htmlFor="department" className="text-gray-700">
        Departamento <span className="text-red-600"> *</span>
      </Label>
      <Select onValueChange={handleDepartmentChange}>
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
      <span className="text-red-600 text-[14px]">
        {errors.department.status && errors.department.message}
      </span>
    </div>
  );
};

export default SelectDepartment;
