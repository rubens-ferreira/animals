import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { Mock, provideMagicalMock } from 'test.helper';
import { AppState } from 'src/app/app.state';
import { environment } from 'src/environments/environment';
import { AnimalView } from '../models/animal-view.model';
import { AnimalService } from '../services/animals.service';
import { AnimalEffects } from './animal.effects';
import { StorageService } from '../services/storage.service';
import * as fromAnimalActions from './animal.actions';
import * as fromAnimalState from './animal.reducer';
import * as fromAnimalSelectors from './animal.selectors';

describe('AnimalEffects', () => {
  let actions$: Observable<any>;
  let effects: AnimalEffects;
  let animalService: Mock<AnimalService>;
  let storageService: Mock<StorageService>;
  let testScheduler: TestScheduler;
  const initialState: AppState = {
    [fromAnimalState.animalsFeatureKey]: fromAnimalState.initialState,
  };

  const message = 'error';
  const animal = { id: 1, name: 'name', image: 'image' };
  const since = 5;
  const page = 10;
  const automaticLoadAnimalsEnabled = true;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnimalEffects,
        provideMockActions(() => actions$),
        provideMagicalMock(AnimalService),
        provideMagicalMock(StorageService),
        provideMagicalMock(StorageService),
        provideMockStore<AppState>({
          initialState,
          selectors: [
            { selector: fromAnimalSelectors.selectSince, value: since },
            { selector: fromAnimalSelectors.selectPage, value: page },
            {
              selector: fromAnimalSelectors.selectAutomaticLoader,
              value: automaticLoadAnimalsEnabled,
            },
          ],
        }),
      ],
    });

    effects = TestBed.inject(AnimalEffects);
    animalService = TestBed.get(AnimalService);
    storageService = TestBed.get(StorageService);
    TestBed.inject(MockStore);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should load animals', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const animals: AnimalView[] = [animal];
      const serviceResponse$ = cold('a|', { a: animals });
      animalService.FindAllAnimals.and.returnValue(serviceResponse$);

      const action = fromAnimalActions.loadAnimals();
      const result = fromAnimalActions.loadAnimalsSuccess({ animals });

      actions$ = cold('a|', { a: action });

      expectObservable(effects.loadAnimals$).toBe('b|', { b: result });
    });
    expect(storageService.SetLocalStorageItem).toHaveBeenCalledWith('since', '1');
    expect(storageService.SetLocalStorageItem).toHaveBeenCalledWith('page', '10');
  });

  it('should fail to load animals', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const serviceResponse$ = cold('#', undefined, message);
      animalService.FindAllAnimals.and.returnValue(serviceResponse$);

      const action = fromAnimalActions.loadAnimals();
      const result = fromAnimalActions.loadAnimalsFailed({ message: JSON.stringify(message) });

      actions$ = cold('a|', { a: action });

      expectObservable(effects.loadAnimals$).toBe('b|', { b: result });
    });
    expect(storageService.SetLocalStorageItem).not.toHaveBeenCalled();
  });

  it('should load animals automatically', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const animals: AnimalView[] = [animal];
      const serviceResponse$ = cold('a|', { a: animals });
      animalService.FindAllAnimals.and.returnValue(serviceResponse$);

      const action = fromAnimalActions.automaticLoadAnimals();
      const result = fromAnimalActions.automaticLoadAnimalsSuccess({ animals });

      actions$ = cold('a|', { a: action });

      expectObservable(effects.automaticLoadAnimals$).toBe('b|', { b: result });
    });
    expect(storageService.SetLocalStorageItem).toHaveBeenCalledWith('since', '1');
    expect(storageService.SetLocalStorageItem).toHaveBeenCalledWith('page', '10');
  });

  it('should fail to load animals automatically', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const serviceResponse$ = cold('#', undefined, message);
      animalService.FindAllAnimals.and.returnValue(serviceResponse$);

      const action = fromAnimalActions.automaticLoadAnimals();
      const result = fromAnimalActions.automaticLoadAnimalsFailed({
        message: JSON.stringify(message),
      });

      actions$ = cold('a|', { a: action });

      expectObservable(effects.automaticLoadAnimals$).toBe('b|', { b: result });
    });
    expect(storageService.SetLocalStorageItem).not.toHaveBeenCalled();
  });

  it('should automatic load after toggle automatic loading selected and the expected time delayed', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const action = fromAnimalActions.toggleAutomaticAnimalLoader();
      const result = fromAnimalActions.automaticLoadAnimals();

      actions$ = cold('a|', { a: action });
      const expected = `${environment.loadAnimalsInterval}ms (b|)`;
      expectObservable(effects.timerToLoadAnimals$).toBe(expected, { b: result });
    });
  });
});
