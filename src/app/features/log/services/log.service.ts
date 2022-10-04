import { Injectable } from '@angular/core';
import { catchError, filter, finalize, from, map, Observable, of } from 'rxjs';
import { LogEntry, LogPage, LogQuery, PageRequest } from '../../../../../types';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  page(request: PageRequest<LogEntry>, query: LogQuery): Observable<LogPage> {

      console.log(request);
      console.log(query.level);
      return from(window.api.getLog(request,query)).pipe(
        catchError((err) => of({
          content: [{ message: err, time: Date.now(), level: 'fatal', stack: new Error(err).stack }],
          num: 0,
          size: 1,
          totalElements: 1,
        } as LogPage)));
  }
}
