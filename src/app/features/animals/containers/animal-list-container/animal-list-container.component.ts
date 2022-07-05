import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { AnimalView } from '../../models/animal-view.model';

import * as fromAnimalActions from '../../state/animal.actions';
import * as fromAnimalSelectors from '../../state/animal.selectors';

@Component({
  selector: 'app-animal-list-container',
  templateUrl: './animal-list-container.component.html',
  styleUrls: ['./animal-list-container.component.scss'],
})
export class AnimalListContainerComponent implements OnInit, OnDestroy {
  animals$: Observable<AnimalView[]> = of([]);

  message$: Observable<string> = of('');

  loading$: Observable<boolean> = of(false);

  automaticLoaderEnabled$: Observable<boolean> = of(false);

  automaticLoaderEnabled: boolean = false;

  automaticLoaderSubscription: Subscription | null = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.animals$ = this.store.select(fromAnimalSelectors.selectAll);
    this.message$ = this.store.select(fromAnimalSelectors.selectMessage);
    this.loading$ = this.store.select(fromAnimalSelectors.selectLoading);
    this.automaticLoaderEnabled$ = this.store.select(fromAnimalSelectors.selectAutomaticLoader);
    this.store.dispatch(fromAnimalActions.loadParameters());

    this.automaticLoaderSubscription = this.automaticLoaderEnabled$.subscribe((enabled) => {
      this.automaticLoaderEnabled = enabled;
    });
  }

  ngOnDestroy(): void {
    if (this.automaticLoaderSubscription) {
      this.automaticLoaderSubscription.unsubscribe();
    }
  }

  loadAnimals() {
    this.store.dispatch(fromAnimalActions.loadAnimals());
  }

  toggleAutomaticLoader() {
    if (!this.automaticLoaderEnabled) {
      this.store.dispatch(fromAnimalActions.loadAnimals());
    }
    this.store.dispatch(fromAnimalActions.toggleAutomaticAnimalLoader());
  }
}
