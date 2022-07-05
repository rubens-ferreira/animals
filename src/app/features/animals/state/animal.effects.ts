import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  delay,
  exhaustMap,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AnimalView } from '../models/animal-view.model';
import { StorageService } from '../services/storage.service';
import { AnimalService } from '../services/animals.service';

import * as fromAnimalActions from './animal.actions';
import * as fromAnimalSelectors from './animal.selectors';

@Injectable()
export class AnimalEffects {
  loadAnimals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAnimalActions.loadAnimals),
      concatLatestFrom(() => [
        this.store.select(fromAnimalSelectors.selectSince),
        this.store.select(fromAnimalSelectors.selectPage),
      ]),
      exhaustMap(([, since, page]) => this.loadAnimals(since, page)),
    );
  });

  // TODO: remove JSON.stringfy to get the error message
  private loadAnimals(since: number, page: number) {
    try {
      return this.animalService.FindAllAnimals(since, page).pipe(
        map((animals: AnimalView[]) => {
          const lastAnimalId = animals[animals.length - 1].id;
          this.storageService.SetLocalStorageItem('since', lastAnimalId.toString());
          this.storageService.SetLocalStorageItem('page', page.toString());
          return fromAnimalActions.loadAnimalsSuccess({ animals });
        }),
        catchError((error) => {
          return of(fromAnimalActions.loadAnimalsFailed({ message: JSON.stringify(error) }));
        }),
      );
    } catch (error) {
      return of(fromAnimalActions.loadAnimalsFailed({ message: JSON.stringify(error) }));
    }
  }

  loadParameters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAnimalActions.loadParameters),
      exhaustMap(() => this.loadParameters()),
    );
  });

  private loadParameters() {
    let since: number = 0;
    let page: number = 0;
    try {
      const sinceStored = this.storageService.GetLocalStorageItem('since');
      const pageStored = this.storageService.GetLocalStorageItem('page');

      if (!sinceStored || !pageStored) {
        since = environment.since;
        page = environment.page;
      }

      since = Number(sinceStored);
      page = Number(pageStored);
    } catch {
      since = environment.since;
      page = environment.page;
    }
    return of(fromAnimalActions.loadParametersSucess({ since, page }));
  }

  automaticLoadAnimals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAnimalActions.automaticLoadAnimals),
      concatLatestFrom(() => [
        this.store.select(fromAnimalSelectors.selectSince),
        this.store.select(fromAnimalSelectors.selectPage),
      ]),
      exhaustMap(([, since, page]) => this.automaticLoadAnimals(since, page)),
    );
  });

  private automaticLoadAnimals(since: number, page: number) {
    try {
      return this.animalService.FindAllAnimals(since, page).pipe(
        map((animals: AnimalView[]) => {
          const lastAnimalId = animals[animals.length - 1].id;
          this.storageService.SetLocalStorageItem('since', lastAnimalId.toString());
          this.storageService.SetLocalStorageItem('page', page.toString());
          return fromAnimalActions.automaticLoadAnimalsSuccess({ animals });
        }),
        catchError((error) => {
          return of(
            fromAnimalActions.automaticLoadAnimalsFailed({ message: JSON.stringify(error) }),
          );
        }),
      );
    } catch (error) {
      return of(fromAnimalActions.automaticLoadAnimalsFailed({ message: JSON.stringify(error) }));
    }
  }

  timerToLoadAnimals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        ...[fromAnimalActions.toggleAutomaticAnimalLoader, fromAnimalActions.automaticLoadAnimals],
      ),
      withLatestFrom(this.store.select(fromAnimalSelectors.selectAutomaticLoader)),
      filter(([, automaticLoaderEnabled]) => automaticLoaderEnabled),
      delay(environment.loadAnimalsInterval),
      withLatestFrom(this.store.select(fromAnimalSelectors.selectAutomaticLoader)),
      filter(([, automaticLoaderEnabled]) => automaticLoaderEnabled),
      switchMap(() => of(fromAnimalActions.automaticLoadAnimals())),
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private animalService: AnimalService,
    private storageService: StorageService,
  ) {}
}
