import { Component, OnInit } from '@angular/core';

import { Router }            from '@angular/router';

import { Client } from '../client/client';
import { stagesOfProgress } from '../client/stage-of-progress';
import { ClientService } from '../client/client.service';

@Component({
  selector: 'client-list',
  moduleId: module.id,  
  templateUrl: './client-list.component.html',  
  styleUrls: ['./client-list.component.css']
})

export class ClientListComponent implements OnInit {
  errorMessage: string;
  clients: Client[];
  stagesOfProgress = stagesOfProgress;
  filter = "all";
  
  constructor (
    private router: Router,
    private clientService: ClientService
  ) {}
  
  ngOnInit() { this.getClients(); }
  getClients() {
    this.clientService.getClients()
                     .subscribe(
                       clients => this.clients = clients,
                       error =>  this.errorMessage = <any>error);
  } 
  
  filterList (stage: string) {
    console.info("filter");
    this.filter = stage;
  }
  
  onSelect(id: String) {
    this.router.navigate(['/client', id]);
  }
}