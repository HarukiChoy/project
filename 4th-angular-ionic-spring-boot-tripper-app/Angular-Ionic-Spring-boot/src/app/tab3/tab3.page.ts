import { Component, OnInit } from '@angular/core';
import { Tab3Service } from './tab3.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  result = [];

  constructor(public tab3Service: Tab3Service) {}

  async ngOnInit() {
    let json = await this.tab3Service.getRate();
    this.result = json.content.reverse();
    console.log(this.result);
  }
}
