import { container } from 'tsyringe';

import IApiProvider from '@admin:containers/providers/API/IApi.provider';
import AxiosProvider from '@admin:containers/providers/API/implementations/Axios.provider';

// ---------------------------------------------------------------------------------------------- //

container.registerSingleton<IApiProvider>('ApiProvider', AxiosProvider);
