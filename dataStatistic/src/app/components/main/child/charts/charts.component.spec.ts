import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsComponent } from './charts.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing'; 
import { selectSelectedFileData } from '../../../../store/load-data/load-data.selector';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;
  let store: MockStore;
  
  const initialState = { };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsComponent],
      providers: [
        provideMockStore({ 
          initialState,
          selectors: [
            { selector: selectSelectedFileData, value: null }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should NOT show filters if file data is null', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.filters')).toBeNull();
  });

  it('should dispatch setSortAlphabetically action when toggleSort is called', () => {
    const spy = spyOn(store, 'dispatch'); 
    const mockEvent = { checked: true };
    
    component.toggleSort(mockEvent);

    expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({
      sortAlphabetically: true
    }));
  });
});