import { WhereOptions } from 'sequelize';

interface IRepository<T> {
  findBy(query: WhereOptions): Promise<T[]>;

  getAll(): Promise<T[]>

  findById(id: string): Promise<T>;

  create(obj: T): Promise<T>

  delete(obj: T): Promise<void>

  update(obj: T): Promise<T>
}

export default IRepository;
