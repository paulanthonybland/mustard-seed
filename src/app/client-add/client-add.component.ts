import { Component, OnInit } from '@angular/core';

import { Router }            from '@angular/router';
 
import { Client } from '../client/client';
import { ClientService } from '../client/client.service';

@Component({
  selector: 'client-add',
  moduleId: module.id,  
  templateUrl: './client-add.component.html',  
  styleUrls: ['./client-add.component.css']
})

export class ClientAddComponent {
  errorMessage: string;
  
  constructor (
    private clientService: ClientService,
    private router: Router
  ) {}
  
  addClient (firstName: string, lastName: string) {
    console.info("ClientAddComponent::addClient");
    if (!firstName) { return; }
    this.clientService.addClient(firstName, lastName)
                     .subscribe(
                       error =>  this.errorMessage = <any>error);
    this.router.navigate(['/clients']);
  }
}