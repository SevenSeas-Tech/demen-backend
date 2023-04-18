import { ManagementRepositoriesInjector } from '@management:injection/repositories/injector';
import { ManagementProviderInjector } from '@management:injection/providers/injector';

// * ---------------------------------------------------------------------- * //

class ManagementDependencyInjector {
  private static readonly repositories = new ManagementRepositoriesInjector();
  private static readonly providers = new ManagementProviderInjector();

  // ------------------------------------------------------------------------ //

  static readonly container = {
    ...this.repositories,
    ...this.providers
  };
}

// * ---------------------------------------------------------------------- * //

export { ManagementDependencyInjector };
