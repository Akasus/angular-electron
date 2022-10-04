import { PaginatedDataSource } from './../../../wrapper/DataSource/';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LogService } from '../services/log.service';
import { LogEntry, LogQuery, Sort } from '../../../../../types';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  animations:[
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LogComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = ['time', 'message', 'level'];
  logLevels = ['warning', 'info' , 'error' , 'fatal'];
  properties = ['time','message', 'level'];
  levels = new FormControl([]);

  initialSort: Sort<LogEntry> = {level: 'ASC', };
  dataSource = new PaginatedDataSource<LogEntry, LogQuery>(
    (request, query) => this.logService.page(request, query),
    this.initialSort,
    { },
    10
    );



  constructor(private logService: LogService) { }
  log(message: any){
    console.log(message);
  }
  ngOnInit(): void {
    console.log('loading logs..');
  }

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

}

