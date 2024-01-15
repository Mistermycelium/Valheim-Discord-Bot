export abstract class TransportMethod<T> {
  protected config: T;

  constructor(config: T) {
    this.config = config;
  }

  abstract upload(payload: string): Promise<boolean>;
}
