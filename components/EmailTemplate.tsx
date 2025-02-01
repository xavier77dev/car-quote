import { EmailTemplateSend } from "@/interfaces";

export const EmailTemplate = ({
  model,
  name,
  email,
  phone,
  department,
  city,
  price,
}: EmailTemplateSend) => {
  return (
    <>
      <h1 className="text-2xl text-blue-800 line-through">
        Gracias por su interés en nuestros vehículos. Le enviamos la cotización
        solicitada:
      </h1>
      <h2>Modelo: {model}</h2>
      <h2>Precio: {price}</h2>
      <h2>Nombre: {name}</h2>
      <h2>email: {email}</h2>
      <h2>Phone: {phone}</h2>
      <h2>City: {city}</h2>
      <h2>Department: {department}</h2>
    </>
  );
};
