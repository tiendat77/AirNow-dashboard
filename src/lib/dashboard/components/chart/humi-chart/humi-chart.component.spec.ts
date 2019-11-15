import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumiChartComponent } from './humi-chart.component';

describe('HumiChartComponent', () => {
  let component: HumiChartComponent;
  let fixture: ComponentFixture<HumiChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumiChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
