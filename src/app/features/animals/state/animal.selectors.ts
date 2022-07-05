import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAnimal from './animal.reducer';

export const selectAnimalState = createFeatureSelector<fromAnimal.State>(fromAnimal.animalsFeatureKey);

export const { selectAll } = fromAnimal.adapter.getSelectors(selectAnimalState);

export const selectLoading = createSelector(selectAnimalState, (state) => state.loading);

export const selectMessage = createSelector(selectAnimalState, (state) => state.message);

export const selectAutomaticLoader = createSelector(
  selectAnimalState,
  (state) => state.automaticLoader,
);

export const selectSince = createSelector(selectAnimalState, (state) => state.since);

export const selectPage = createSelector(selectAnimalState, (state) => state.page);
