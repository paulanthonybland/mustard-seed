import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Client } from './client';

@Injectable()
export class ClientService {
  private clientsUrl = 'app/clients';  // URL to web API
  constructor (private http: Http) {}
  getClients (): Observable<Client[]> {
    return this.http.get(this.clientsUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    console.info("extractData");
    console.info("res: " + res.text());
    let body = res.json();
    console.info("body:" + body);
    console.info("Body back to json: " + JSON.stringify(body));
    console.info("body.data: " + body.data);
    return body.data || { };
  }
  private handleError (error: Response | any) {
    console.error("handleError: " + error)
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
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
