import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'my-app',
  template: `
    <nav>
      <a routerLink="/clients" routerLinkActive="active">clients</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent  {  }
