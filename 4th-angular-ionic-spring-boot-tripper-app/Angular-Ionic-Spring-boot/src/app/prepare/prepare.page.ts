import { TripService } from './../trip/trip.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-prepare',
  templateUrl: './prepare.page.html',
  styleUrls: ['./prepare.page.scss'],
})
export class PreparePage implements OnInit {
  isDisabled = true;
  content: string;

  constructor(private tripService: TripService) {}

  ngOnInit() {}

  @ViewChild(IonModal) modal: IonModal;
  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.content = '';
  }
  async confirm() {
    this.modal.dismiss(this.content, 'confirm');
    return await this.tripService.addToPrepareList(this.content);
    this.content = '';
  }

  editPrepareList() {
    if (this.isDisabled === false) {
      this.isDisabled = true;
      return;
    }
    this.isDisabled = false;
  }

  async updatePrepareList() {
    return;
  }

  get prepareList() {
    return this.tripService.prepareList;
  }
  get doneList() {
    return this.tripService.doneList;
  }
}
