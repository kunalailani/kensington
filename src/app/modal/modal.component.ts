import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../shared/modal.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input () modalData: any;

  constructor(private router: Router, private modalService: ModalService) { }

  ngOnInit() {
  }

   redirectToLogin() {
   	this.modalService.displayModal(false);
    this.router.navigate(['/login']);
  }

}
