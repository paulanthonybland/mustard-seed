import { InMemoryDbService } from 'angular-in-memory-web-api';

export class ClientData implements InMemoryDbService {
  createDb() {
    let clients = [
      { 
        id: 1, 
        firstname: 'Paul',
        lastname: "Bland",
        dob: "1963-10-16",
        dateOfReferral: "2014-08-22",
        stageOfProgress: "waiting",
      },
      {
        id: 2, 
        firstname: 'Francis',
        lastname: "Bland", 
        dob: "1965-05-12",
        dateOfReferral: "2015-01-14",
        stageOfProgress: "open",
      },
      { 
        id: 3, 
        firstname: 'Lucy',
        lastname: "Bland", 
        dob: "2001-11-03",
        dateOfReferral: "2013-09-02",
        stageOfProgress: "closed",
      }
    ];
    return {clients};
  }
}

