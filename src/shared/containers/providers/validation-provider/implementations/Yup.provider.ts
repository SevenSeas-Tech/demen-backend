import * as yup from 'yup';
import YupPassword from 'yup-password';

import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import { LoginCredentials } from '@accounts:types/sessions/Sessions';

import IValidationProvider from '../IValidation.provider';

class Yup implements IValidationProvider {
  private passwordMin = 6;
  private passwordMax = 16;
  private passwordUpper = 1;
  private passwordNumber = 1;
  private passwordRepeating = 2;
  private passwordSymbol = 0;

  private stringMin = 3;

  constructor() {
    YupPassword(yup);
  }

  async validateLogin(credentials: LoginCredentials): Promise<boolean> {
    const loginSchema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup
        .string()
        .password()
        .min(this.passwordMin)
        .max(this.passwordMax)
        .minUppercase(this.passwordUpper)
        .minNumbers(this.passwordNumber)
        .minRepeating(this.passwordRepeating)
        .minSymbols(this.passwordSymbol)
        .required()
    });
    return loginSchema.isValid(credentials);
  }

  async validateUser(userData: CreateUserDto): Promise<boolean> {
    const userSchema = yup.object().shape({
      username: yup.string().min(this.stringMin).required(),
      name: yup.string().min(this.stringMin).required(),
      lastName: yup.string().min(this.stringMin).required(),
      email: yup.string().email().required(),

      password: yup
        .string()
        .password()
        .min(this.passwordMin)
        .max(this.passwordMax)
        .minUppercase(this.passwordUpper)
        .minNumbers(this.passwordNumber)
        .minRepeating(this.passwordRepeating)
        .minSymbols(this.passwordSymbol)
        .required()
    });
    // console.log(await userSchema.validate(userData));
    return userSchema.isValid(userData);
  }
}

export default Yup;
