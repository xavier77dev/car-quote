import { EmailTemplate, ErrorsState } from "@/interfaces";

export const validateForm = (
  formData: EmailTemplate,
  errors: ErrorsState,
  setErrors: React.Dispatch<React.SetStateAction<any>>,
) => {
  const newErrors = {
    model: {
      status: formData.model.trim() === "",
      message: "Seleccionar un modelo",
    },
    name: {
      status: formData.name.trim() === "",
      message: "Ingresar su nombre",
    },
    email: {
      status: formData.email.trim() === "",
      message: "Ingresar un email",
    },
    city: {
      status: formData.city!.trim() === "",
      message: "Seleccionar una ciudad",
    },
    aceptsPolicy: {
      status: !formData.acceptsPolicy,
      message: "Debes aceptar la POLITICA DE TRATAMIENTO DE DATOS",
    },
    department: {
      status: formData.department!.trim() === "",
      message: "Seleccionar un departamento",
    },
  };
  setErrors(newErrors);
  return !Object.values(newErrors).some((error) => error.status);
};
