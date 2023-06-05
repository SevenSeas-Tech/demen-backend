import { HashProviderSymbol } from '@management:injection/providers/symbols';
import {
  EmailTypesRepositorySymbol,
  EmailsRepositorySymbol,
  ManagersRepositorySymbol
} from '@management:injection/repositories/symbols';
import { DependencyInjection } from '@shared/injection';

import { ManagerCreationService } from '../manager-creation-service';

// * ---------------------------------------------------------------------- * //

function injectService(): ManagerCreationService {
  const { container } = DependencyInjection;

  return new ManagerCreationService(
    container[ManagersRepositorySymbol],
    container[EmailsRepositorySymbol],
    container[EmailTypesRepositorySymbol],
    container[HashProviderSymbol]
  );
}

// * ---------------------------------------------------------------------- * //

export { injectService };
