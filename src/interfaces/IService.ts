export interface IService<T> {
  create(obj: T): Promise<T>;
  update(obj: T): Promise<T>;
  delete(obj: T): Promise<void>;
  findBy(id: string): Promise<T>;
}
