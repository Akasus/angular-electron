import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LogEntry } from "../../types";

@Entity()
export class LogEntryModel implements LogEntry{

  @PrimaryGeneratedColumn()
  time: number;

  @Column()
  message: string;

  @Column()
  level: string;

  @Column()
  stack: string;

}
