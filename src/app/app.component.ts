import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'my-app',
  template: `
    <router-outlet></router-outlet>
    <nav>
      <a href="add-client">Add New Client</a>
    </nav>
  `
})
export class AppComponent  {  }
