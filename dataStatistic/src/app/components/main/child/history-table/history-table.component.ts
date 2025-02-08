import {Component} from '@angular/core';
import {selectLoadedFiles} from '../../../../store/load-data/load-data.selector';
import {toSignal} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../interfaces/app.interface';
import {TableModule} from 'primeng/table';
import {DatePipe} from '@angular/common';
import {setSelectedFile} from '../../../../store/load-data/load-data.actions';

@Component({
  selector: 'app-history-table',
  imports: [
    TableModule,
    DatePipe,
  ],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.less'
})
export class HistoryTableComponent {
  hoveredIndex: number | null = null;

  constructor(private store: Store<AppState>
  ) {
  }

  selectFile(file: { filename: string; date: Date; data: { category: string; value: number }[] }) {
    this.store.dispatch(setSelectedFile({ selectedFileData: file.data }));
  }

  loadedFiles = toSignal(this.store.select(selectLoadedFiles));
}
