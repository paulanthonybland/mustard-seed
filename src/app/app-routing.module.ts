import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { PageNotFoundComponent }   from './page-not-found.component';
import { ClientAddComponent }      from './client-add/client-add.component';
import { ClientDetailComponent }   from './client-detail/client-detail.component';
import { ClientListComponent }     from './client-list/client-list.component';

const appRoutes: Routes = [
  {
    path: 'clients',
    component: ClientListComponent
  },
  {
    path: 'client/:id',
    component: ClientDetailComponent
  },
  {
    path: 'add-client',
    component: ClientAddComponent
  },
  { path: '',
    redirectTo: '/clients',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}