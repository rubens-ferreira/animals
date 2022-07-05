import { ActionReducerMap } from '@ngrx/store';
import * as fromAnimal from './features/animals/state/animal.reducer';

export interface AppState {
  [fromAnimal.animalsFeatureKey]: fromAnimal.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAnimal.animalsFeatureKey]: fromAnimal.reducer,
};
