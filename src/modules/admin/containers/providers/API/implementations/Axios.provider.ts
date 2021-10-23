import IAPIProvider from '../IAPI.provider';

class AxiosProvider implements IAPIProvider {
  getVideo(_: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default AxiosProvider;
