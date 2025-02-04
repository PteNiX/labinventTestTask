import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import {AppState} from '../../interfaces/app.interface';
import {selectDataset} from '../../store/load-data/load-data.selector';


@Component({
  selector: 'app-main',
  imports: [CommonModule, FileUploadComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less',
  standalone: true,

})
export class MainComponent {
  selectedData = toSignal(this.store.select(selectDataset));

  constructor(private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
  }
}
