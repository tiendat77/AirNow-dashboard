import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import * as CanvasJS from '../../../../../assets/canvasjs.min';
import { Observable } from 'rxjs';

@Component({
  selector: 'temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TempChartComponent implements OnInit {

  @Input() data: Observable<any[]>;
  dataPoints: Array<any>;

  ngOnInit() {
    this.data.subscribe( data => {
      this.dataPoints = data;
      console.log('got data: ', data);
      this.renderChart();
    });
  }

  renderChart() {
    const chart = new CanvasJS.Chart('tempChartContainer', {
      theme: 'dark2', // "light1", "dark1", "dark2"
      backgroundColor: '#222437',
      zoomEnabled: true,
      animationEnabled: true,

      title: {
        text: 'Temperature Statistics',
        fontSize: 25,
      },

      toolTip: {
        shared: true
      },

      axisX: {
        valueFormatString: 'DD-MMM' ,
        labelAngle: -50,
      },

      axisY: {
        labelFontSize: 20,
        title: '°C',
        includeZero: false,
        scaleBreaks: {
          autoCalculate: true
        },
      },

      data: [
      {
        type: 'line',
        name: 'Temperature',
        color: '#ff7043',
        lineColor: '#ff7043',
        dataPoints: this.dataPoints
      }]
    });

    chart.render();
  }


}
