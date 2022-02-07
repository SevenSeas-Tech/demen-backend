import { validate } from 'uuid';
import * as yup from 'yup';
import YupPassword from 'yup-password';

import { CreateEmployeeDto } from '@accounts:dtos/users/CreateEmployee.dto';
import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import { UpdateEmployeeDto } from '@accounts:dtos/users/UpdateEmployee.dto';
import { UpdateUserDto } from '@accounts:dtos/users/UpdateUser.dto';
import { LoginCredentials } from '@accounts:types/sessions/Sessions';

import { IValidationProvider } from '../IValidation.provider';

// ---------------------------------------------------------------------------------------------- //

class Yup implements IValidationProvider {
  private usernameRegex = /^[A-Za-z]\w{5,15}$/;

  private passwordMin = 6;
  private passwordMax = 16;
  private passwordUpper = 1;
  private passwordNumber = 1;
  private passwordRepeating = 2;
  private passwordSymbol = 0;

  private stringMin = 3;

  // -------------------------------------------------------------------------------------------- //

  constructor() {
    YupPassword(yup);
  }

  validateUserCreationData(_: CreateUserDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  validateUserUpdateData(_: UpdateUserDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  // -------------------------------------------------------------------------------------------- //

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

  // -------------------------------------------------------------------------------------------- //

  async validateEmployeeCreationData(employeeData: CreateEmployeeDto): Promise<boolean> {
    const validUsername = this.usernameRegex.exec(employeeData.username);

    if (!validUsername) {
      return false;
    }

    const userSchema = yup.object().shape({
      username: yup.string().required(),
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
    return userSchema.isValid(employeeData);
  }

  // -------------------------------------------------------------------------------------------- //

  async validateEmployeeUpdateData(employeeData: UpdateEmployeeDto): Promise<boolean> {
    const { id } = employeeData;

    const isUuid = validate(id);

    if (!isUuid) {
      return false;
    }

    const userSchema = yup.object().shape({
      id: yup.string().required(),
      name: yup.string().min(this.stringMin).required(),
      lastName: yup.string().min(this.stringMin).required()
    });

    return userSchema.isValid(employeeData);
  }
}

export default Yup;
