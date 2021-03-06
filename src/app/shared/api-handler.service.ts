import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(private http: HttpClient, private loaderService: LoaderService) { }

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
    console.log("error ", error);
    this.loaderService.displayLoader(false);
  }
  get(path: string, params = {}): Observable<any> {
  	return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(true),
      params: new HttpParams({
        fromObject: params
      })
    })
  	.pipe(map(res => res),
      catchError((error) => {
        this.handleError(error);
        return error;
      }))
  }

  post(path: string, body: any = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), {headers: this.setHeaders(true)})
    .pipe(catchError((error) => of(`I caught: ${error}`)))
  }

  put(path: string, body: any, isJson): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, body, {headers: this.setHeaders(isJson)})
   .pipe(catchError((error) => of(`I caught: ${error}`))) 
  }
}
