"use client";

import { validateForm } from "@/components/utils/validations";
import { initialAuto } from "@/constants/autoConstant";
import { initialErrors } from "@/constants/errorsConstant";
import { initialFormData } from "@/constants/formDataConstant";
import { useToast } from "@/hooks/use-toast";
import { Auto, Department, EmailTemplate, ErrorsState } from "@/interfaces";
import { useAutoStore } from "@/stores/carStore";
import { useEffect, useState } from "react";

export const useFormQuote = () => {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [formData, setFormData] = useState<EmailTemplate>(initialFormData);
  const [errors, setErrors] = useState<ErrorsState>(initialErrors);
  const [departments, setDepartments] = useState<Department[]>([]);
  const { toast } = useToast();

  const { auto, setAuto } = useAutoStore();

  useEffect(() => {
    const fetchAutos = async () => {
      const response = await fetch("/api/autos");
      const data = await response.json();
      setAutos(data);
    };

    fetchAutos();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formData, errors, setErrors)) {
      return;
    }

    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast({
        title: "¡Enviado!",
        description: "Tu cotización ha sido enviada.",
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: "Hubo un error al enviar la cotización.",
        variant: "destructive",
      });
    }
  };

  const updateAuto = () => {
    const fiundAuto = autos.find((auto) => auto.name === formData.model);
    setAuto(fiundAuto || initialAuto);
  };

  useEffect(() => {
    if (formData.model.length > 0) {
      updateAuto();
    }
  }, [formData.model]);

  return {
    handleSubmit,
    autos,
    departments,
    setDepartments,
    formData,
    setFormData,
    errors,
    setErrors,
  };
};
