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
  client: Client;
  
  constructor (
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {
    console.info("ClientDetailComponent::constructor");
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
  
  ngOnInit() {
    console.info("ngOnInit");
    let id = this.route.snapshot.params['id'];
    console.info("id is " + id);
    this.clientService.getClient(id)
      .then(client => {
        this.clientForm.setValue({
          firstname: client.firstname,
          lastname: client.lastname,
          dob: client.dob,
          dateOfReferral: client.dateOfReferral,
          stageOfProgress: client.stageOfProgress,
        });
        this.client = client;
      },
      err => console.error("Got an error: " + err));
  } 
}
