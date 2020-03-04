import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import * as CanvasJS from '../../../../../assets/canvasjs.min';

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
      if (data.length > 0) {
        this.dataPoints = data;
        // console.log('aqi: ', {data: data});
        this.renderChart();
      }
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
        shared: true,
        contentFormatter: (e) => {
          let toolTip = '<span><strong style="color: #ab47bc">AQI: </strong>';
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

  formatTime(date: Date) {
    let formatted = '';
    formatted += date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())  + ' ';
    formatted += date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

    return formatted;
  }

}
