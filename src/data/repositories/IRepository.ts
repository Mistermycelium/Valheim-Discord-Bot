import { WhereOptions } from 'sequelize';

interface IRepository<T,S> {
  // Read Operations
  getAll(): Promise<T[]>
  findById(id: string): Promise<T>;
  findBy(query: WhereOptions): Promise<T[]>;
  delete(query: WhereOptions): Promise<void>
  // Write Operations
  create(obj: T): Promise<T|S>
  update(obj: T): Promise<T>}

export default IRepository;
