import type { ManagerCreationData } from '@management:dto/manager/manager-creation-data';

// * ---------------------------------------------------------------------- * //

function isRequestValid(data: ManagerCreationData): boolean {
  const {
    name,
    surname,
    emailAddress,
    emailType,
    password,
    passwordConfirmation
  } = data;

  if (name && surname && emailAddress && emailType && password &&
    passwordConfirmation) return true;

  return false;
}

// * ---------------------------------------------------------------------- * //

export { isRequestValid };
