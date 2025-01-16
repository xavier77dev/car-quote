export interface EmailTemplate {
  model: string;
  name: string;
  email: string;
  phone: string;
  department?: string;
  departmentId?: string;
  city?: string;
  acceptsPolicy: boolean;
}

export interface Auto {
  id: number;
  name: string;
  price: number;
}

export interface Department {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  departmentId?: number;
}
