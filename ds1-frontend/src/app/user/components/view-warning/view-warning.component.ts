import {Component, Input, OnInit} from '@angular/core';
import {Warning} from "../../types";

@Component({
  selector: 'app-view-warning',
  template: `
    <div class="warn-color warn-background">
      On {{warning.date}}, at {{warning.hour}} o'clock,
      your device {{warning.deviceName}} exceeded its maximum value for energy consumption.
      It registered {{warning.value}} kWh, which exceeds the maximum {{warning.maxConsumption}} kWh
      by {{warning.value-warning.maxConsumption}} kWh.
    </div>
  `,
  styleUrls: ['./view-warning.component.scss']
})
export class ViewWarningComponent implements OnInit {
  @Input() warning: Warning;

  constructor() { }

  ngOnInit(): void {
  }

}
