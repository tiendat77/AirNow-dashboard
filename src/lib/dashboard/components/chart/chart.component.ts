import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() results: any; // Chart data
  @Input() xAxisLabel;
  @Input() yAxisLabel;

  // Ngx Line Chart Property
  chartType = 'line-chart';
  colorScheme: any = {
    selectable: true,
    name: 'cool',
    group: 'Ordinal',
    domain: [
      '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
    ]
  };
  schemeType = 'ordinal';

  // Chart options
  animations = true;
  autoScale = true;
  gradient = false;
  legendPosition = 'below';
  maxXAxisTickLength = 16;
  maxYAxisTickLength = 16;
  rangeFillOpacity = 0.15;
  rotateXAxisTicks = true;
  roundDomains = false;
  showLegend = true;
  showGridLines = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showXAxis = true;
  showYAxis = true;
  timeline = false;
  tooltipDisabled = false;
  trimXAxisTicks = true;
  trimYAxisTicks = true;
  view: any[];


  barPadding = 8;
  groupPadding = 16;
  innerPadding = '10%';
  maxRadius = 10;
  minRadius = 3;
  noBarWhenZero = true;
  roundEdges = true;
  showText = true;
  showSeriesOnHover = true;
  showDataLabel = false;
  xScaleMin: any;
  xScaleMax: any;
  yScaleMin: number;
  yScaleMax: number;

  constructor() { }

  ngOnInit() {
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  select(data) {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  activate(data) {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  deactivate(data) {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
