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
        text: 'Temperature Statistic',
        fontSize: 25,
      },

      toolTip: {
        shared: true,
        contentFormatter: (e) => {
          let toolTip = '<span><strong style="color: #ff7043">Temperature: </strong>';
          const date: Date = e.entries[0].dataPoint.x;
          const value = Math.round(e.entries[0].dataPoint.y * 10) / 10;

          toolTip += value + '</span>' + '</br>';
          toolTip += 'Time: ' + this.formatTime(date);
          return toolTip;
        },
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

  formatTime(date: Date) {
    let formatted = '';
    formatted += date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())  + ' ';
    formatted += date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

    return formatted;
  }

}
