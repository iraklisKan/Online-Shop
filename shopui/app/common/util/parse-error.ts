import { FormResponse } from "../interfaces/form-response.interface";

export const parseFieldError = (errorMessage: string): FormResponse => {
  const lowerMessage = errorMessage.toLowerCase();

  if (lowerMessage.includes("email")) return { emailError: errorMessage };
  if (lowerMessage.includes("password")) return { passwordError: errorMessage };
  if (lowerMessage.includes("name")) return { nameError: errorMessage };
  if (lowerMessage.includes("description")) return { descriptionError: errorMessage };
  if (lowerMessage.includes("price")) return { priceError: errorMessage };

  return { error: errorMessage };
};
