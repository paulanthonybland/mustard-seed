import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { FormsModule }             from '@angular/forms';
import { HttpModule, JsonpModule }  from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { ClientData }                 from './client-data';

import { AppComponent }       from './app.component';
import { ClientListComponent }  from './client-list/client-list.component';
import { ClientService }  from './client-list/client.service';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    InMemoryWebApiModule.forRoot(ClientData) 
  ],
  declarations: [ 
    AppComponent,
    ClientListComponent 
  ],
  exports: [
    ClientListComponent
  ],
  providers: [
    ClientService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
