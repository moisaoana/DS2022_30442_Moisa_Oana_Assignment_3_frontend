import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { Chart } from '../../types';

@Component({
  selector: 'app-chart',
  template:`
    <div class="grafico">
      <div class="content">
        <div class="bars" *ngFor="let item of list">
          <span>{{item.value | number : '1.2-2'}}</span>
          <div class="bar" [style.background-color]="item.color" [style.height]='item.size'></div>
        </div>
      </div>
      <div class="line"></div>
      <div class="legends">
        <span *ngFor="let item of list">{{item.legend}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() list: Chart[];
  public total=0;
  public maxHeight= 160;

  constructor() { }

  ngOnInit(): void {
    //this.generate();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.total=0;
    this.generate();

   // this.doSomething(changes.categoryId.currentValue);
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values

  }

  generate(){
    this.list?.forEach(element => {
      this.total += element.value;
    });
    console.log(this.total)

    this.list?.forEach(element => {
      element.size = Math.round((element.value*this.maxHeight)/this.total) + '%';
    });
  }
}
