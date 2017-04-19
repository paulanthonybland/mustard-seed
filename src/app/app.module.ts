import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { FormsModule }             from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent }            from './app.component';
import { AppRoutingModule }        from './app-routing.module';
import { PageNotFoundComponent }   from './page-not-found.component';
import { ClientAddComponent }      from './client-add/client-add.component';
import { ClientListComponent }     from './client-list/client-list.component';
import { ClientService }           from './client/client.service';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
//    InMemoryWebApiModule.forRoot(ClientData) 
  ],
  declarations: [ 
    AppComponent, 
    ClientAddComponent,
    ClientListComponent,
    PageNotFoundComponent
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
