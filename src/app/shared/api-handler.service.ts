import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(private http: HttpClient) { }

  public setHeaders(isJson): HttpHeaders {
  	const headerConfig = {  		
  		'Accept': 'application/json'
  	}    

    if (isJson) {
       headerConfig["Content-Type"] = 'application/json';
    }
    if (localStorage.getItem("authorizedToken")) {
      headerConfig["Authorization"] = 'Bearer ' + localStorage.getItem("authorizedToken");
    }

  	return new HttpHeaders(headerConfig);
  }
  public handleError(error: any) {

  }
  get(path: string, params = {}): Observable<any> {
  	return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(true),
      params: new HttpParams({
        fromObject: params
      })
    })
  	.pipe(catchError((error) => of(`I caught: ${error}`)))
  }

  post(path: string, body: any = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), {headers: this.setHeaders(true)})
    .pipe(catchError((error) => of(`I caught: ${error}`)))
  }

  put(path: string, body: any): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, body, {headers: this.setHeaders(false)})
   .pipe(catchError((error) => of(`I caught: ${error}`))) 
  }
}
