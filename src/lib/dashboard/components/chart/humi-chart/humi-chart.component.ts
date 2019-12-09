import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import * as CanvasJS from '../../../../../assets/canvasjs.min';
import { Observable } from 'rxjs';

@Component({
  selector: 'humi-chart',
  templateUrl: './humi-chart.component.html',
  styleUrls: ['./humi-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HumiChartComponent implements OnInit {

  @Input() data: Observable<any[]>;
  dataPoints: Array<any>;

  ngOnInit() {
    this.data.subscribe( data => {
      this.dataPoints = data;
      this.renderChart();
    });
  }

  renderChart() {
    const chart = new CanvasJS.Chart('humiChartContainer', {
      theme: 'dark2', // "light1", "dark1", "dark2"
      backgroundColor: '#222437',
      zoomEnabled: true,
      animationEnabled: true,

      title: {
        text: 'Humidity Statistic',
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
        title: '%',
        includeZero: false,
        scaleBreaks: {
          autoCalculate: true
        },
      },

      data: [
      {
        type: 'line',
        name: 'Humidity',
        color: '#03a9f4',
        lineColor: '#03a9f4',
        dataPoints: this.dataPoints
      }]
    });

    chart.render();
  }


}
