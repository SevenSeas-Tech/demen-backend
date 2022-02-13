import { container } from 'tsyringe';

import { IApiProvider } from '@lessons:containers/providers/API/IApi.provider';

import { AxiosProvider } from './API/implementations/Axios.provider';

// ---------------------------------------------------------------------------------------------- //

container.registerSingleton<IApiProvider>('ApiProvider', AxiosProvider);
