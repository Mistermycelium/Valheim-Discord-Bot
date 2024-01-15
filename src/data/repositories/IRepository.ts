import { WhereOptions } from 'sequelize';
import IListEntry from '../../interfaces/models/IListEntry';

interface IRepository<T> {
  findById(id: string): Promise<T>;

  findBy(query: WhereOptions<IListEntry>): Promise<T[]>;

  getAll(): Promise<T[]>

  create(obj: T): Promise<T>

  delete(obj: T): Promise<void>

  update(obj: T): Promise<T>
}

export default IRepository;
