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
        shared: true,
        contentFormatter: (e) => {
          let toolTip = '<span><strong style="color: #03a9f4">AQI: </strong>';
          let date: Date = e.entries[0].dataPoint.x;

          toolTip += e.entries[0].dataPoint.y + '</span>' + '</br>';
          toolTip += 'Time: ' + this.formatTime(date);
          return toolTip;
        },
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

  formatTime(date: Date) {
    let formatted = '';
    formatted += date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())  + ' ';
    formatted += date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

    return formatted;
  }

}
