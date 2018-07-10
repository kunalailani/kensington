import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(private http: Http) { }

  private setHeaders(): Headers {
  	const headerConfig = {
  		'Content-Type': 'application/json',
  		'Accept': 'application/json'
  	}
  	return new Headers(headerConfig);
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
  	return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params})
  	.pipe(map((response: Response) => response.json()))
  }
}
