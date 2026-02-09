export interface FormResponse {
  emailError?: string;
  passwordError?: string;
  nameError?: string;
  descriptionError?: string;
  priceError?: string;
  error?: string;
  success?: boolean;
  data?: {
    id: number;
    name?: string;
    description?: string;
    price?: number;
  };
}
