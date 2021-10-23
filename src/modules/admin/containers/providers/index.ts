import { container } from 'tsyringe';

import IAPIProvider from '@admin:containers/providers/API/IAPI.provider';
import AxiosProvider from '@admin:containers/providers/API/implementations/Axios.provider';

// ---------------------------------------------------------------------------------------------- //

container.registerSingleton<IAPIProvider>('APIProvider', AxiosProvider);
