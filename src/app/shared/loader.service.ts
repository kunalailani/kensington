import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loaderStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	displayLoader(value: boolean) {
	    this.loaderStatus.next(value);
	}
}
