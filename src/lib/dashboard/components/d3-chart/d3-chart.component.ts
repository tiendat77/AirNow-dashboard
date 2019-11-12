import { Component, OnInit, Input, ViewEncapsulation, OnChanges, ElementRef, ViewChild } from '@angular/core';

import * as CanvasJS from '../../../../assets/canvasjs.min';

@Component({
  selector: 'd3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class D3ChartComponent implements OnInit {
  @Input() data: Array<any>;

  ngOnInit() {
    const dataPoints = [];
    let y = 0;
    for ( let i = 0; i < 10000; i++ ) {
      y += Math.round(5 + Math.random() * (-5 - 5));
      dataPoints.push({ y: y});
    }
    let chart = new CanvasJS.Chart('chartContainer', {
      theme: 'dark2', // "light1", "dark1", "dark2"
      backgroundColor: '#222437',
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Air Quality Index Statistics'
      },
      axisY: {
        title: 'AQI',
      },
      data: [
      {
        type: 'line',
        dataPoints: this.data
      }]
    });

    chart.render();
  }

  test() {
    console.log('test', this.data);
  }

}
