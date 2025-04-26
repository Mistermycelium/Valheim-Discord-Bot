export interface IService<T,S> {
  create(obj: T): Promise<T|S>;
  update(obj: T): Promise<T>;
  delete(obj: T): Promise<void>;
  findBy(id: string): Promise<T>;
}
