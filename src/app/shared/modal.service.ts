import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modalStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  displayModal(value: boolean) {
	    this.modalStatus.next(value);
	}
}
