"use client";

import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSelectCity } from "@/hooks/use-select-city";
import { Department, EmailTemplate, ErrorsState } from "@/interfaces";

export interface SelectCityProps {
  setFormData: React.Dispatch<React.SetStateAction<EmailTemplate>>;
  formData: EmailTemplate;
  departments: Department[];
  setErrors: React.Dispatch<React.SetStateAction<ErrorsState>>;
  errors?: ErrorsState;
}

const SelectCity = ({
  setFormData,
  formData,
  departments,
  setErrors,
  errors,
}: SelectCityProps) => {
  const { handleCityChange, cities } = useSelectCity({
    setFormData,
    formData,
    departments,
    setErrors,
    errors,
  });

  return (
    <div className="space-y-2">
      <Label htmlFor="city" className="text-gray-700">
        Ciudad <span className="text-red-600"> *</span>
      </Label>
      <Select onValueChange={handleCityChange} value={formData.city}>
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

      <span className="text-red-600 text-[14px]">
        {errors!.city.status && errors!.city.message}
      </span>
    </div>
  );
};

export default SelectCity;
