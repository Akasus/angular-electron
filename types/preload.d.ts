import { LogEntry, LogPage, LogQuery } from './log';
import { PageRequest } from './Pagination';

 export interface IVersions {
  node: () => string;
  chrome: () => string;
  electron: () => string;
}

export interface IWindow {
close: () => void;
minimize: () => void;
maximize: () => void;
openWin: (title: string) => void;
getData: (key: string) => Promise<any>;
getLog: (page: PageRequest<LogEntry>, query: LogQuery) => Promise<LogPage>;
}

export interface IContent {
getFiles: () => Promise<string[]>;
}

declare global {
  interface Window {
      versions: IVersions;
      api: IWindow;
      noteContent: IContent;
  }
}
