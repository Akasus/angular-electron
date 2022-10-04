import { Page } from '.';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface LogQuery {
  timefrom?: number;
  timeto?: number;
  level?: string[];
}



export interface LogEntry {
  time: number;
  message: string;
  level: string;
  stack: string;
}


export type LogPage = Page<LogEntry>;
