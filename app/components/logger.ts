import { PageRequest, LogEntry, LogPage, LogQuery } from "../../src";
import { LogRepository } from './database';
import {Logger as dblogger, QueryRunner} from 'typeorm'

type Key<T> = keyof T;


class DBLogger implements dblogger {
  logQuery(query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    throw new Error("Method not implemented.");
  }
  logQueryError(error: string | Error, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    throw new Error("Method not implemented.");
  }
  logQuerySlow(time: number, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    throw new Error("Method not implemented.");
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner | undefined) {
    throw new Error("Method not implemented.");
  }
  logMigration(message: string, queryRunner?: QueryRunner | undefined) {
    throw new Error("Method not implemented.");
  }
  log(level: "warn" | "info" | "log", message: any, queryRunner?: QueryRunner | undefined) {
    throw new Error("Method not implemented.");
  }

}


class Logger {

  public SwitchMode(mode : 'local' | 'database') {
    Logger.UseLocalLog = mode === 'local';
  }

  private static UseLocalLog = false;

  private m_logSet: LogEntry[];

  private get logSet(){
      this.m_logSet ??= [];
      return this.m_logSet;
  }

  constructor(private toStdOut: boolean) {
    this.log("Logger Initialized");
  }

  public log(...message: any) {
    this._log(message, 'info');
  }

  public warn(...message: any) {
    this._log(message, 'warning');
  }
  public error(...message: any) {
    this._log(message, 'error');
  }

  public getLog = Logger.UseLocalLog? this.getLocalLog : this.getDBLog;

  public async getDBLog(request: PageRequest<LogEntry>, query: LogQuery): Promise<LogPage> {
    const start = request.page * request.size;
    const end = start + request.size;
    // const pageLogs = filtered.slice(start, end);
    const logs = await LogRepository.getPage(request, query);
    const matches = await LogRepository.count(query);
    const page = {
      content: logs,
      num: request.page,
      size: logs.length,
      totalElements: matches,
    };
    return page;
  }

  private async getLocalLog(request: PageRequest<LogEntry>, query: LogQuery): Promise<LogPage> {
    const regex = new RegExp(`\\b(?:${query.level?.join('|') ?? ''})\\b`);
    const filtered = this.m_logSet.filter(e => {
      let valid = regex.test(e.level);
      valid &&= e.time >= (query.timefrom ?? 0);
      valid &&= e.time <= (query.timeto ?? Date.now() + 1000);
      return valid;
    })
      // .filter(e => e.time > query.timefrom)
      // .filter(e => e.time < query.timeto)

      .sort((a, b) => {
        let res = 0;
        for (const [k, v] of Object.entries(request.sort)) {

          const propA = a[k];
          const propB = b[k];
          let result;
          if (typeof propA === 'string') {
            result = propA.toLowerCase().localeCompare(propB.toString().toLowerCase());
          } else {
            result = propA as any - (propB as any);
          }
          const factor = v === 'ASC' ? 1 : -1;
          res *= result * factor;
        }
        return res;
      });
    const start = request.page * request.size;
    const end = start + request.size;
    const pageUsers = filtered.slice(start, end);
    const page = {
      content: pageUsers,
      num: request.page,
      size: pageUsers.length,
      totalElements: filtered.length
    };
    return Promise.resolve(page);
  }


  private _log(message: any, level: string) {
    const data = { message, time: Date.now(), level, stack: new Error().stack ?? '' } as LogEntry;
    Logger.UseLocalLog? this.m_logSet.push(data) : LogRepository.create(data);
    if (!this.toStdOut) return;
    console.log(data);
  }
}

const logger = new Logger(true);
export default logger;
