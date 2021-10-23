interface IAPIProvider {
  getVideo(id: string): Promise<void>;
}

export default IAPIProvider;
