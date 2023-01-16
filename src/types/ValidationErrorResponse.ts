import { ValidationError } from 'express-validator';

export default interface ValidationErrorResponse {
  errors: ValidationError[];
}
