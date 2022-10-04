import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';


@Component({
    selector:'app-title-bar',
    templateUrl:'./title-bar.component.html',
    styleUrls:['./title-bar.component.scss']
    })

export class TitleBarComponent
{
  isMaximized = false;
  ecWindow = window.api;
  title = new Observable<string>((observer) =>{
      console.log('looking for title');
      window.api.getData('title').then(data => observer.next(data));
});

  minimize(){
    console.log('minimize');
    window.api.minimize();
  }
  maximize(){
    console.log('maximize');
    window.api.maximize();
  }
  close(){
    console.log('closing');
    window.api.close();
  }
}
