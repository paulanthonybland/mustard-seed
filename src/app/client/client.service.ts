import { Inject, Injectable }                      from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { DOCUMENT }                                from '@angular/platform-browser';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Client } from './client';

@Injectable()
export class ClientService {
  //private clientsUrl = 'app/clients';  // URL to web API
  private clientsUrl = '';  // URL to web API
  
  constructor (@Inject(DOCUMENT) private document: any, private http: Http) {
    console.info("constructor");
    this.clientsUrl = document.location.protocol + '//' + document.location.hostname + ':8080/mustard-seed/clients';
  }
  
  getClients (): Observable<Client[]> {
    console.info("getClients");
    let getHeaders = new Headers();
    getHeaders.append('Authorization', 'Basic YWRtaW46Y2hhbmdlaXQ=');
    let options = new RequestOptions({ headers: getHeaders, withCredentials: true });
    return this.http.get(this.clientsUrl, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    console.info("extractData");
    console.info("res: " + res.text());
    let body = res.json();
    return body["_embedded"] || { };
  }
  private handleError (error: Response | any) {
    console.error("handleError: " + error)
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      console.error("Got an instance of Response")
      console.error("OK? " + error.ok)
      console.error("URL? %s",error.url)
      console.error("status? %s", error.status)
      console.error("statusText? %s", error.statusText)
      console.error("Headers: %s",JSON.stringify(error.headers))
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  addClient (firstname: string, lastname: string): Observable<Client> {
    console.info("ClientService::addClient");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic YWRtaW46Y2hhbmdlaXQ=');
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    let registrationDate: string = new Date().toISOString().substr(0, 10);
    let data = new Client(firstname, lastname, "", registrationDate, "waiting");
    return this.http.post(this.clientsUrl, data, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

}
