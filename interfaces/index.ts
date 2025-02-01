export interface EmailTemplate {
  model: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  departmentId?: string;
  city?: string;
  acceptsPolicy?: boolean;
  cityName?: string;
}

export interface EmailTemplateSend {
  model: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  city: string;
  price?: number;
}

export interface Auto {
  id: number;
  name: string;
  price: number;
  image: string;
  speed: string;
  acceleration: string;
  maxSpeed: string;
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

export interface ErrorField {
  status: boolean;
  message: string;
}

export interface ErrorsState {
  model: ErrorField;
  name: ErrorField;
  email: ErrorField;
  city: ErrorField;
  aceptsPolicy: ErrorField;
  department: ErrorField;
}
