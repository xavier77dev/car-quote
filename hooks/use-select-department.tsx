import { Department, EmailTemplate, ErrorsState } from "@/interfaces";
import { useEffect } from "react";

interface SelectDepartmentProps {
  setFormData: React.Dispatch<React.SetStateAction<EmailTemplate>>;
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
  setErrors: React.Dispatch<React.SetStateAction<ErrorsState>>;
}

export const useSelectDepartment = ({
  setFormData,
  setDepartments,
  setErrors,
}: SelectDepartmentProps) => {
  const getDepartments = async () => {
    const departments = await fetch("/api/departments");
    setDepartments(await departments.json());
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const handleDepartmentChange = (value: string) => {
    console.log(value, "value");
    setFormData((prev) => ({
      ...prev,
      department: value,
    }));

    setErrors((prev) => ({
      ...prev,
      department: {
        ...prev.department,
        status: value.trim().length > 0,
        message:
          value.trim().length > 0 ? "" : "Por favor selecciona un departamento",
      },
    }));
  };

  return {
    handleDepartmentChange,
  };
};
