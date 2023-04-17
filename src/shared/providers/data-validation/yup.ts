// import { validate } from 'uuid';
import * as yup from 'yup';
import YupPassword from 'yup-password';

import type { DataValidationProvider } from '@shared/@types/providers/data-validation';
import type { ManagerCreationData } from '@management:dto/manager/create';
import type { ManagerUpdateData } from '@management:dto/manager/update';
import type { LoginCredentials } from '@management:dto/session/login';

// * ---------------------------------------------------------------------- * //

// ! --- deprecated ------------------------------------------------------- ! //
// todo: decide if re-implement yup or implement zod instead... ------------- //

class YupDataValidationProvider implements DataValidationProvider {
  private usernameRegex = /^[A-Za-z]\w{5,15}$/;

  private passwordMin = 6;
  private passwordMax = 16;
  private passwordUpper = 1;
  private passwordNumber = 1;
  private passwordRepeating = 2;
  private passwordSymbol = 0;

  private stringMin = 3;

  private loginSchema = yup.object().shape({
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

  // ------------------------------------------------------------------------ //

  constructor() {
    YupPassword(yup);
  }

  // *** --- public methods --------------------------------------------- *** //

  async validateManagerLogin(credentials: LoginCredentials): Promise<boolean> {
    return this.loginSchema.isValid(credentials);
  }

  validateManagerCreationData(_data: ManagerCreationData): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  validateManagerUpdateData(_data: ManagerUpdateData): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  // ! --- deprecated ----------------------------------------------------- ! //

  // async validateEmployeeCreationData(employeeData: CreateEmployeeDto): Promise<boolean> {
  //   const validUsername = this.usernameRegex.exec(employeeData.username);

  //   if (!validUsername) {
  //     return false;
  //   }

  //   const userSchema = yup.object().shape({
  //     username: yup.string().required(),
  //     name: yup.string().min(this.stringMin).required(),
  //     lastName: yup.string().min(this.stringMin).required(),
  //     email: yup.string().email().required(),

  //     password: yup
  //       .string()
  //       .password()
  //       .min(this.passwordMin)
  //       .max(this.passwordMax)
  //       .minUppercase(this.passwordUpper)
  //       .minNumbers(this.passwordNumber)
  //       .minRepeating(this.passwordRepeating)
  //       .minSymbols(this.passwordSymbol)
  //       .required()
  //   });

  //   return userSchema.isValid(employeeData);
  // }

  // ------------------------------------------------------------------------ //

  // async validateEmployeeUpdateData(employeeData: UpdateEmployeeDto): Promise<boolean> {
  //   const { id } = employeeData;

  //   const isUuid = validate(id);

  //   if (!isUuid) {
  //     return false;
  //   }

  //   const userSchema = yup.object().shape({
  //     id: yup.string().required(),
  //     name: yup.string().min(this.stringMin).required(),
  //     lastName: yup.string().min(this.stringMin).required()
  //   });

  //   return userSchema.isValid(employeeData);
  // }
}

// * ---------------------------------------------------------------------- * //

export { YupDataValidationProvider };
