import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideMainNavComponent } from './core/components/side-main-nav/side-main-nav.component';
import { LogComponent } from './features/log/';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'log',
    loadChildren: () => import('./features/log/log.module').then(m => m.LogModule),
    component: LogComponent,
  },
  // {
  //   path: 'admin',
  //   children: [
  //     { path: '', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule) }
  //   ],
  //   component: SideMainNavComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
