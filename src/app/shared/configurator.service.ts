import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {

  public username: string;
  public isLoggedin: boolean;
  public configuratorData: Object;
  public searchData: Object = {};

  configuratorDataSubject = new Subject<any>();
  searchDataSubject = new Subject<any>();

  constructor() {   		
  	this.configuratorData = {
  		username: localStorage.getItem('username'),
  		isLoggedin: localStorage.getItem('authorizedToken') ? true : false
  	}
  }

  getConfiguratorData() {
  	return this.configuratorData;
  }
  dataChange(): Observable<any> {
  	return this.configuratorDataSubject.asObservable();
  }

  setConfiguratorData(data) {
  	this.configuratorDataSubject.next(data);
  	return Object.assign(this.configuratorData, data);
  }

  getSearchDataResult() {
    return this.searchData;
  }
  searchDataChange(): Observable<any> {
    return this.searchDataSubject.asObservable();
  }
  setSearchDataResult(data) {
    this.searchDataSubject.next(data);
    return Object.assign(this.searchData, data);
  }
}
