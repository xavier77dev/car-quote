interface EmailTemplateProps {
  model: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  city: string;
}

export const EmailTemplate = ({
  model,
  name,
  email,
  phone,
  department,
  city,
}: EmailTemplateProps) => {
  return (
    <>
      <h1 className="text-2xl text-blue-800 line-through">Hola Mundo!</h1>
      <p className="italic text-red-400">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
        similique quo iste iure rerum dolore blanditiis totam dolores amet neque
        cupiditate, praesentium mollitia aspernatur exercitationem, molestiae
        assumenda sed a deserunt?
      </p>
      <h2>Modelo: {model}</h2>
      <h2>Nombre: {name}</h2>
      <h2>email: {email}</h2>
      <h2>Phone: {phone}</h2>
      <h2>City: {city}</h2>
      <h2>Department: {department}</h2>
    </>
  );
};

