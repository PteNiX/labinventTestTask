import {Component} from '@angular/core';
import {FileUpload} from 'primeng/fileupload';
import {Store} from '@ngrx/store';
import {loadDataAction, setSelectedFile} from '../../../../store/load-data/load-data.actions';
import {AppState} from '../../../../interfaces/app.interface';

@Component({
  selector: 'app-file-upload',
  imports: [
    FileUpload
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.less',
  standalone: true
})
export class FileUploadComponent {
  errorMessage: string = '';

  constructor(private store: Store<AppState>
  ) {
  }

  onFileSelected(event: any) {
    const uploadFile: File = event.files[0];

    if (uploadFile.size > 5 * 1024 * 1024) {
      this.errorMessage = "File exceeds 5MB";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result as string);

        if (!Array.isArray(jsonData) || !jsonData.every(item => "category" in item && "value" in item)) {
          this.errorMessage = "Invalid data format";
          return;
        }
        const fileData = {
          filename: uploadFile.name,
          date: new Date(),
          data: jsonData
        };

        this.store.dispatch(loadDataAction({file: fileData}));
        this.store.dispatch(setSelectedFile({selectedFileData: fileData.data}));
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = "Error parsing JSON";
      }
    };

    reader.readAsText(uploadFile);
  }
}
