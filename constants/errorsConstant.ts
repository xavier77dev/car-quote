import { ErrorsState } from "@/interfaces";

export const initialErrors: ErrorsState = {
  model: {
    status: false,
    message: "Seleccionar un modelo",
  },
  name: {
    status: false,
    message: "Ingresar su nombre",
  },
  email: {
    status: false,
    message: "Ingresar un email",
  },
  city: {
    status: false,
    message: "Seleccionar una ciudad",
  },
  aceptsPolicy: {
    status: false,
    message: "Debes aceptar la POLITICA DE TRATAMIENTO DE DATOS",
  },
  department: {
    status: false,
    message: "Seleccionar un departamento",
  },
};
