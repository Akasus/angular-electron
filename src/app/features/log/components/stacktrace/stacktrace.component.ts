import { Stacktrace } from './../../../../shared/pipes/stacktrace.pipe';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-stacktrace',
  templateUrl: './stacktrace.component.html',
  styleUrls: ['./stacktrace.component.scss']
})
export class StacktraceComponent implements OnInit {
  @Input() stack: Stacktrace[];
  displayedColumns = ['line', 'pos', 'func', 'path'];
  dataSource: MatTableDataSource<Stacktrace>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Stacktrace>(this.stack);
  }

}
