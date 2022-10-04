import * as sql from 'sqlite3';
import { Between, DataSource, In, Repository, SaveOptions } from 'typeorm';
import { LogEntry, LogQuery, PageRequest } from '../../src';
import { LogEntryModel } from '../Entities/log';
import { Stacktrace } from '../../src/app/shared/pipes/stacktrace.pipe';
import logger from './logger';




const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database/app.sqlite',
  synchronize: true,
  logging: true,
  logger: ''
  entities: [LogEntryModel],
  migrations: [],
  subscribers: []
});




  AppDataSource.initialize()
  .then(() => {
    logger.warn("Data Source has been initialized!")
  })
  .catch((err) => {
    logger.SwitchMode('local');
    logger.error("Error during Data Source initialization:", err);

  });

class LogRepo {
  constructor(private repo: Repository<LogEntryModel>) { }

  static usefallbackarray = false;

  async create(logEntry: LogEntry,) {
    var res = this.repo.save(logEntry);
    return res;
  }

  async getPage(request: PageRequest<LogEntry>, query: LogQuery) {

    var where = {
      time: Between(query.timefrom ?? 0, query.timeto ?? Date.now() + 10000)
    } as any;
    if(query.level)
    where.level = In([...query.level]);


    var res = await this.repo.find({
      where,
      order: request.sort,
      skip: request.page * request.size,
      take: request.size,
      cache: true,
    });

    return res
  }

  async count(query: LogQuery) {
    var res = this.repo.count({
      where: {
        time: Between(query.timefrom ?? 0, query.timeto ?? Date.now() + 10000),
        level: query.level ? In(query.level) : undefined,
      },

    })
    return res;
  }
}

export const LogRepository = new LogRepo(AppDataSource.getRepository(LogEntryModel));
