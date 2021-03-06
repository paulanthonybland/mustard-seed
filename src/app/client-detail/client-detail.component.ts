import { Component, Input, OnInit }      from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Client }        from '../client/client';
import { ClientService } from '../client/client.service';
import { stagesOfProgress } from '../client/stage-of-progress';

@Component({
  moduleId: module.id,  
  templateUrl: './client-detail.component.html'
})
export class ClientDetailComponent implements OnInit {
  clientForm:FormGroup;
  
  stagesOfProgress = stagesOfProgress;
  id: string;
  client: Client;
  
  constructor (
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {
    this.createForm();
    stagesOfProgress.splice(0, 1);
  }  
  
  createForm() {
    this.clientForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      dob: ['', Validators.required ],
      dateOfReferral: ['', Validators.required ],
      stageOfProgress: ''
    });
  } 
  
  populateClientForm(client: Client) {
    if (!client.dob) {
      client.dob = "1970-01-01";
    }
    this.clientForm.setValue({
      firstname: client.firstname,
      lastname: client.lastname,
      dob: client.dob,
      dateOfReferral: client.dateOfReferral,
      stageOfProgress: client.stageOfProgress,
    });
    this.client = client;
  }
  
  ngOnInit() {  
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id)
      .then(client => {
        this.populateClientForm(client);
      },
      err => console.error("Got an error: " + err));    
  } 
  
  prepareSaveClient(): Client {
    const formModel = this.clientForm.value;
    
    const saveClient: Client = {
      _id: this.id,
      firstname: formModel.firstname as string,
      lastname: formModel.lastname as string,
      dob: formModel.dob as string,
      dateOfReferral: formModel.dateOfReferral as string,
      stageOfProgress: formModel.stageOfProgress as string,
    }    
    
    return saveClient;
  }
  
  onSubmit() {
    console.log("ClientDetailComponent::onSubmit");
    this.client = this.prepareSaveClient();
    this.clientService.updateClient(this.client)
      .then(client => {
        console.log("updateClient response: " + JSON.stringify(client));
        this.populateClientForm(client);
      },
      err => console.error("onSubmit::Got an error: " + err));
  }
  
  revert() {
    this.populateClientForm(this.client);
  }
}
