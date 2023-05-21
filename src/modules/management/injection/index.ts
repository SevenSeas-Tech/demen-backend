import { ManagementProviderContainer } from '@management:injection/providers/injector';
import { ManagementRepositoriesContainer } from '@management:injection/repositories/injector';

// * ---------------------------------------------------------------------- * //

class ManagementDependencyInjector {
  private static readonly repositories = new ManagementRepositoriesContainer();
  private static readonly providers = new ManagementProviderContainer();

  // ------------------------------------------------------------------------ //

  static readonly container = {
    ...this.repositories,
    ...this.providers
  };
}

// * ---------------------------------------------------------------------- * //

export { ManagementDependencyInjector };
