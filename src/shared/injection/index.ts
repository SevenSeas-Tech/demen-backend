import { ManagementDependencyInjector } from '@management:injection/index';
import { SharedProviderInjector } from '@shared:injection/providers';

// * ---------------------------------------------------------------------- * //

class DependencyInjection {
  private static readonly sharedProviderContainer =
    new SharedProviderInjector();

  private static readonly managementContainer =
    ManagementDependencyInjector.container;

  // ------------------------------------------------------------------------ //

  static readonly container = {
    ...this.sharedProviderContainer,
    ...this.managementContainer
  };
}

// * ---------------------------------------------------------------------- * //

export { DependencyInjection };
