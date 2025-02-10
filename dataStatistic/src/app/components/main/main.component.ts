import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploadComponent} from './child/file-upload/file-upload.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import {AppState} from '../../interfaces/app.interface';
import {selectLoadedFiles} from '../../store/load-data/load-data.selector';
import {HistoryTableComponent} from './child/history-table/history-table.component';
import {ChartsComponent} from './child/charts/charts.component';


@Component({
  selector: 'app-main',
  imports: [CommonModule, FileUploadComponent, HistoryTableComponent, ChartsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less',
  standalone: true,

})
export class MainComponent {
  selectLoadedFiles = toSignal(this.store.select(selectLoadedFiles));

  constructor(private store: Store<AppState>
  ) {
  }

}
