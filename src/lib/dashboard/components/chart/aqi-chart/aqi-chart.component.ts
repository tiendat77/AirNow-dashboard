import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import * as CanvasJS from '../../../../../assets/canvasjs.min';
import { Observable } from 'rxjs';

@Component({
  selector: 'aqi-chart',
  templateUrl: './aqi-chart.component.html',
  styleUrls: ['./aqi-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AqiChartComponent implements OnInit {

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
    const chart = new CanvasJS.Chart('AQIchartContainer', {
      theme: 'dark2', // "light1", "dark1", "dark2"
      backgroundColor: '#222437',
      zoomEnabled: true,
      animationEnabled: true,

      title: {
        text: 'Air Quality Index Statistic',
        fontSize: 25,
      },

      toolTip: {
        shared: true
      },

      axisX: {
        valueFormatString: 'DD-MMM' ,
        labelAngle: -50
      },

      axisY: {
        labelFontSize: 20,
        title: 'AQI',
        includeZero: false,
        scaleBreaks: {
          autoCalculate: true
        },
      },

      data: [
      {
        type: 'line',
        name: 'AQI',
        color: '#ab47bc',
        lineColor: '#ab47bc',
        dataPoints: this.dataPoints
      }]
    });

    chart.render();
  }

}
