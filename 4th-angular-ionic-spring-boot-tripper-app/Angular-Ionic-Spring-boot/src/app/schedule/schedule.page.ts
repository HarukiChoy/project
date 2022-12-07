import { TripService } from './../trip/trip.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  isDisabled = true;
  date: string;
  time: string;
  location: string;

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
    this.date = '';
    this.time = '';
    this.location = '';
  }
  async confirm() {
    this.modal.dismiss(
      { date: this.date, time: this.time, location: this.location },
      'confirm'
    );
    console.log(this.date, this.time, this.location);

    await this.tripService.addToSchedule({
      tripId: this.id,
      date: this.date,
      time: this.time,
      location: this.location,
    });
    this.date = '';
    this.time = '';
    this.location = '';
    return;
  }

  // editPrepareList() {
  //   if (this.isDisabled === false) {
  //     this.isDisabled = true;
  //     return;
  //   }
  //   this.isDisabled = false;
  // }

  // async changeToDone(prepare: PrepareList) {
  //   console.log('prepare: ', prepare);
  //   await this.tripService.changeToDone(prepare);
  // }

  // get prepareList() {
  //   return this.tripService.prepareList;
  // }
  // get doneList() {
  //   return this.tripService.doneList;
  // }
}
