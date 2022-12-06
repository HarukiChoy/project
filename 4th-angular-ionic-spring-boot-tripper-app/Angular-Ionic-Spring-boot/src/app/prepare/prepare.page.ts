import { PrepareList } from './../model/interface';
import { TripService } from './../trip/trip.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prepare',
  templateUrl: './prepare.page.html',
  styleUrls: ['./prepare.page.scss'],
})
export class PreparePage implements OnInit {
  isDisabled = true;
  content: string;

  constructor(
    private tripService: TripService,
    private activatedRoute: ActivatedRoute
  ) {}

  sub?: Subscription;
  id: number;

  async ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    });
    await this.tripService.getList(this.id);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  @ViewChild(IonModal) modal: IonModal;
  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.content = '';
  }
  async confirm() {
    this.modal.dismiss(this.content, 'confirm');
    await this.tripService.addToPrepareList({
      tripId: this.id,
      content: this.content,
    });
    this.content = '';
    return;
  }

  editPrepareList() {
    if (this.isDisabled === false) {
      this.isDisabled = true;
      return;
    }
    this.isDisabled = false;
  }

  async changeToDone(prepare: PrepareList) {
    console.log('prepare: ', prepare);
    await this.tripService.changeToDone(prepare);
  }

  // async updatePrepareList() {
  //   return await this.tripService.updatePrepareList();
  // }

  get prepareList() {
    return this.tripService.prepareList;
  }
  get doneList() {
    return this.tripService.doneList;
  }
}
