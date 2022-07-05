import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { provideMockStore } from '@ngrx/store/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MessageComponent } from '../../components/message/message.component';
import { AnimalListContainerComponent } from './animal-list-container.component';
import * as fromAnimalActions from '../../state/animal.actions';
import * as fromAnimalState from '../../state/animal.reducer';
import { AnimalListComponent } from '../../components/animal-list/animal-list.component';

describe('AnimalListContainerComponent', () => {
  let component: AnimalListContainerComponent;
  let fixture: ComponentFixture<AnimalListContainerComponent>;
  let store: Store;
  let spy: any;
  const initialState: AppState = {
    [fromAnimalState.animalsFeatureKey]: fromAnimalState.initialState,
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        MatCardModule,
        MatDividerModule,
        MatTableModule,
        MatButtonModule,
        MatCheckboxModule,
      ],
      declarations: [MessageComponent, AnimalListContainerComponent, AnimalListComponent],
      providers: [
        provideMockStore<AppState>({
          initialState,
        }),
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalListContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit load animals action', () => {
    component.loadAnimals();
    expect(spy).toHaveBeenCalledWith(fromAnimalActions.loadAnimals());
  });

  it('should emit toggle automatic animal loader action', () => {
    component.toggleAutomaticLoader();
    expect(spy).toHaveBeenCalledWith(fromAnimalActions.toggleAutomaticAnimalLoader());
  });

  it('should emit load parameters on init', () => {
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(fromAnimalActions.loadParameters());
  });
});
