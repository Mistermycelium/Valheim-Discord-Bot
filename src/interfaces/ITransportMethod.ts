export interface ITransportMethod<T, S> {
  upload(config:T, payload: S): Promise<boolean>;
}
