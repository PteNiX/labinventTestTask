import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadComponent],
 providers: [
        provideMockStore({}),
        provideHttpClient(), 
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set error message if file size exceeds 5MB', () => {
    const largeFile = new File([''], 'large.json', { type: 'application/json' });
    Object.defineProperty(largeFile, 'size', { value: 6 * 1024 * 1024 });
    const event = { files: [largeFile] };


    component.onFileSelected(event);

    expect(component.errorMessage).toBe('File exceeds 5MB');
  });


  it('should set error message if JSON structure is invalid', (done) => {

    const invalidData = JSON.stringify([{ "wrongKey": "test" }]);
    const file = new File([invalidData], 'test.json', { type: 'application/json' });
    const event = { files: [file] };

    component.onFileSelected(event);


    setTimeout(() => {
      expect(component.errorMessage).toBe('Invalid data format');
      done();
    }, 10);
  });


  it('should dispatch actions if file is valid', (done) => {
    const spy = spyOn(store, 'dispatch');
    const validData = JSON.stringify([{ "category": "A", "value": 10 }]);
    const file = new File([validData], 'valid.json', { type: 'application/json' });
    const event = { files: [file] };

    component.onFileSelected(event);

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(2);
      expect(component.errorMessage).toBe('');
      done();
    }, 10);
  });
});