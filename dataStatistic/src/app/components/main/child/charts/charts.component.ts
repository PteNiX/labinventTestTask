import {Component} from '@angular/core';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {FormsModule} from '@angular/forms';
import {ToggleSwitch} from 'primeng/toggleswitch';

@Component({
  selector: 'app-charts',
  imports: [
    PieChartComponent,
    BarChartComponent,
    FormsModule,
    ToggleSwitch
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.less'
})
export class ChartsComponent {
  checked: boolean = false;
}
