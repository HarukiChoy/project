import { Tab3Service } from './../tab3/tab3.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-rate-chart',
  templateUrl: './rate-chart.page.html',
  styleUrls: ['./rate-chart.page.scss'],
})
export class RateChartPage implements OnInit {
  chart;

  constructor(private tab3Service: Tab3Service) {}

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.tab3Service.date,
        datasets: [
          {
            label: 'BUYING PRICE',
            data: this.tab3Service.buyResult,
            backgroundColor: 'blue',
          },
          {
            label: 'SELLING PRICE',
            data: this.tab3Service.sellResult,
            backgroundColor: 'red',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  get eng() {
    return this.tab3Service.eng;
  }

  // createChart() {
  //   this.chart = new Chart('myChart', {
  //     type: 'line',
  //     data: {
  //       labels: [
  //         '2022-12-01',
  //         '2022-12-02',
  //         '2022-12-03',
  //         '2022-12-04',
  //         '2022-12-05',
  //       ],
  //       datasets: [
  //         {
  //           label: 'BUYING PRICE',
  //           data: ['1.5', '2', '2.3', '1.8', '1.3'],
  //           backgroundColor: 'blue',
  //         },
  //         {
  //           label: 'SELLING PRICE',
  //           data: ['3.4', '3.6', '3.3', '3.0', '2.6'],
  //           backgroundColor: 'red',
  //         },
  //       ],
  //     },
  //     options: {
  //       aspectRatio: 2.5,
  //     },
  //   });
  // }
}
