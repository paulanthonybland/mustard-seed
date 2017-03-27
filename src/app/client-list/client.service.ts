import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Client } from './client';

@Injectable()
export class ClientService {
  //private clientsUrl = 'app/clients';  // URL to web API
  private clientsUrl = 'http://api:8080/mustard-seed/clients';  // URL to web API
  constructor (private http: Http) {
    console.info("constructor");
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
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.clientsUrl, { firstname, lastname }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

}
