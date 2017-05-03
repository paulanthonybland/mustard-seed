import { Component, OnInit }      from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Client }        from '../client/client';
import { ClientService } from '../client/client.service';

@Component({
  moduleId: module.id,  
  templateUrl: './client-detail.component.html'
})
export class ClientDetailComponent {
  client: Client;
  
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private service: ClientService
  ) {}  
  
  ngOnInit() { 
    this.route.params
      .switchMap((params: Params) => this.service.getClient(params['id']))
      .subscribe((client: Client) => this.client = client);
  }
}