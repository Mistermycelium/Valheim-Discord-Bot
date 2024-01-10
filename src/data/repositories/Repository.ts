interface Repository<T> {
  getAll(): Promise<T[]>

  create(obj: T): Promise<T | Error>

  delete(obj: T): Promise<void | Error>

  update(obj: T): Promise<T | Error>
}

export default Repository;
