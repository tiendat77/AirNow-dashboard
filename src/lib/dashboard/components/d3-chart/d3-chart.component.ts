import { Component, OnInit, Input, ViewEncapsulation, OnChanges, ElementRef, ViewChild } from '@angular/core';

import * as CanvasJS from '../../../../assets/canvasjs.min';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'd3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class D3ChartComponent implements OnInit {
  @Input() data: BehaviorSubject<any[]>;
  dataPoints: Array<any>;

  ngOnInit() {
    this.data.subscribe( data => {
      this.dataPoints = data;
      console.log('got data: ', data);
      this.renderChart();
    });
  }

  renderChart() {
    const chart = new CanvasJS.Chart('chartContainer', {
      theme: 'dark2', // "light1", "dark1", "dark2"
      backgroundColor: '#222437',
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,

      title: {
        text: 'Air Quality Index Statistics'
      },

      axisX: {
        valueFormatString: 'DD-MMM' ,
        labelAngle: -50
      },

      axisY: {
        title: 'AQI',
      },

      data: [
      {
        type: 'line',
        dataPoints: this.dataPoints
      }]
    });

    chart.render();
  }

}
