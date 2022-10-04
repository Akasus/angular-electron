import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogComponent } from './components/log.component';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDetailRowDirective } from '../../shared/directives/';
import { SharedModule } from '../../shared/shared.module';
import { StacktracePipe } from '../../shared/pipes/stacktrace.pipe';
import { StacktraceComponent } from './components/stacktrace/stacktrace.component';

@NgModule({
  declarations: [
    LogComponent,
      CdkDetailRowDirective,
      StacktraceComponent,
   ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class LogModule { }
