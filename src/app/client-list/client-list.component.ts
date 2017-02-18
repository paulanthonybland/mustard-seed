import { Component, OnInit } from '@angular/core';

import { Client } from './client';
import { stagesOfProgress } from './stage-of-progress';
import { ClientService } from './client.service';

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
  constructor (private clientService: ClientService) {}
  ngOnInit() { this.getClients(); }
  getClients() {
    this.clientService.getClients()
                     .subscribe(
                       clients => this.clients = clients,
                       error =>  this.errorMessage = <any>error);
  }  
  
  addClient (firstName: string, lastName: string) {
    if (!firstName) { return; }
    this.clientService.addClient(firstName, lastName)
                     .subscribe(
                       client  => this.clients.push(client),
                       error =>  this.errorMessage = <any>error);
  }
  
  filterList (stage: string) {
    console.info("filter");
    this.filter = stage;
  }
}