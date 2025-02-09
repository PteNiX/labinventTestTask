import {Component} from '@angular/core';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {FormsModule} from '@angular/forms';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {toSignal} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../interfaces/app.interface';
import {selectSelectedFileData} from '../../../../store/load-data/load-data.selector';

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
  selectSelectedFileData = toSignal(this.store.select(selectSelectedFileData));

  constructor(private store: Store<AppState>
  ) {
  }

}
