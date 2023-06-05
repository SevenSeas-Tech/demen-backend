import { PasswordDoesNotMatchError } from '@management:errors/password-match';

// * ---------------------------------------------------------------------- * //

function passwordsMatchOrThrow(password: string, password2: string): void {
  if (!(password === password2)) throw new PasswordDoesNotMatchError();
}

// * ---------------------------------------------------------------------- * //

export { passwordsMatchOrThrow };
