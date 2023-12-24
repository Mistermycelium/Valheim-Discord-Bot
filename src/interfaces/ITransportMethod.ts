
export interface ITransportMethod<T> {
  upload(payload: T): Promise<T>;
}