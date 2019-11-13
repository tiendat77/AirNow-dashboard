import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import * as CanvasJS from '../../../../assets/canvasjs.min';
import { Observable } from 'rxjs';

@Component({
  selector: 'temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TempChartComponent implements OnInit {

  @Input() data: Observable<any[]>;
  @Input() title: string;
  @Input() titleYAxis: string;
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
        text: this.title
      },

      axisX: {
        valueFormatString: 'DD-MMM' ,
        labelAngle: -50
      },

      axisY: {
        title: this.titleYAxis,
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
