import IRepository from './IRepository';
import { Server, UserServerStatus } from '../Database';
import { ServerInterface } from '../models/Server';
import { ForeignKeyConstraintError, UniqueConstraintError, WhereOptions } from 'sequelize';
import { Mutex } from 'async-mutex';
class ServerRepository implements IRepository<ServerInterface, Boolean> {
  mutex: any;

  constructor() {
    this.mutex = new Mutex();
  }

  async findByIServerId(id: number): Promise<ServerInterface> {
    return await Server.findOne({ where: { Id: id } })
      .then((server) => {
        if (server) {
          return server.dataValues as ServerInterface;
        } else {
          throw new Error(`Server ${id} not found`);
        }
      }, (err) => {
        throw err;
      });
  }

  private releaseMutex() {
    this.mutex.release();
  }

  async findBy(query: WhereOptions): Promise<ServerInterface[]> {
    return Server.findAll({
      where: query,
      include: [{
        model: UserServerStatus,
        as: 'ServerServerStatus',
        where: query,
        required: true,
      }],
    })
      .then(servers => servers.map(server => server.dataValues as ServerInterface))
      .catch(err => {
        throw new Error(`Error executing query: ${query}, error: ${err}`);
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findById(id: string): Promise<ServerInterface> {
    throw new Error('Method not implemented.');
  }

  async getAll(): Promise<ServerInterface[]> {
    const result = await Server.findAll();
    return result.map(item => item.dataValues as ServerInterface);
  }

  async create(server: ServerInterface): Promise<ServerInterface> {
    return this.mutex.acquire().then(async () => {
      const existingServer = await Server.findOne({
        where: {
          Id: server.Id,
        },
      });
      if (existingServer) {
        this.releaseMutex();
        return existingServer.update(server);
      } else {
        await Server.create(server)
          .then((created) => {
            this.releaseMutex();
            return created;
          }, (err) => {
            throw new Error(`Error creating ${server.Name}:, for GuildId: ${server.GuildId}, error: ${err}`);
          });
      }
    }, (err: Error) => {
      throw new Error(`Error creating ${server.Name}:, DiscorId: ${server.GuildId}, error: ${err}`);
    });
  }

  async delete(query: WhereOptions): Promise<void> {
    this.mutex.acquire().then(async () => {
      await Server.destroy({
        where: query,
      }).then((rowsDeleted) => {
        if (rowsDeleted === 1) {
          console.log('Deleted successfully');
        }
        this.releaseMutex();
      }).catch((err) => {
        if (err instanceof ForeignKeyConstraintError) {
          throw new Error(`The query: ${JSON.stringify(query, null, 2)} failed with Cause: ${err.message}.`);
        }
        throw err;
      });
    });
  }

  async update(server: Server): Promise<ServerInterface> {
    return this.mutex.acquire().then(async () => {
      await Server.update(server, {
        where: {
          Id: server.Id,
        },
      }).then((updated) => {
        if (updated !== undefined) {
          console.log('Updated successfully');
          this.releaseMutex();
          return Server;
        }
      }).catch((err) => {
        if (err instanceof UniqueConstraintError) {
          throw new Error(`${JSON.stringify(Server, null, 2)} already exists`);
        }
      });
    });
  }
}

export { ServerRepository };
