import { ManagementDependencyInjector } from '@management:injection/index';
import { SharedProviderInjector } from '@shared:injection/providers';

// * ---------------------------------------------------------------------- * //

class DependencyInjection {
  private static readonly sharedProviderInjection =
    new SharedProviderInjector();

  private static readonly managementInjector =
    ManagementDependencyInjector.container;

  // ------------------------------------------------------------------------ //

  static readonly container = {
    ...this.sharedProviderInjection,
    ...this.managementInjector
  };
}

// * ---------------------------------------------------------------------- * //

export { DependencyInjection };
