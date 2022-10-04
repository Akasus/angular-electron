import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { StacktracePipe } from './pipes/stacktrace.pipe';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, StacktracePipe],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, StacktracePipe]
})
export class SharedModule {}
