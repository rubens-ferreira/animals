import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AnimalActions from './animal.actions';
import { AnimalView } from '../models/animal-view.model';

export const animalsFeatureKey = 'animals';

export interface State extends EntityState<AnimalView> {
  loading: boolean;
  message: string;
  automaticLoader: boolean;
  since: number;
  page: number;
}

export const adapter: EntityAdapter<AnimalView> = createEntityAdapter<AnimalView>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  message: '',
  automaticLoader: false,
  since: 0,
  page: 5,
});

export const reducer = createReducer(
  initialState,
  on(AnimalActions.loadAnimals, (state) => ({
    ...state,
    loading: true,
    message: '',
  })),
  on(AnimalActions.automaticLoadAnimals, (state) => ({
    ...state,
    loading: true,
    message: '',
  })),
  on(AnimalActions.loadAnimalsSuccess, (state, action) => ({
    ...adapter.setAll(action.animals, state),
    loading: false,
    since: action.animals[action.animals.length - 1].id,
    message: '',
  })),
  on(AnimalActions.automaticLoadAnimalsSuccess, (state, action) => ({
    ...adapter.setAll(action.animals, state),
    loading: false,
    since: action.animals[action.animals.length - 1].id,
    message: '',
  })),
  on(AnimalActions.loadAnimalsFailed, (state, action) => ({
    ...state,
    loading: false,
    message: action.message,
  })),
  on(AnimalActions.automaticLoadAnimalsFailed, (state, action) => ({
    ...state,
    loading: false,
    message: action.message,
  })),
  on(AnimalActions.toggleAutomaticAnimalLoader, (state) => ({
    ...state,
    automaticLoader: !state.automaticLoader,
  })),
  on(AnimalActions.dismissMessage, (state) => ({
    ...state,
    message: '',
  })),
  on(AnimalActions.loadParameters, (state) => ({
    ...state,
    loading: true,
  })),
  on(AnimalActions.loadParametersSucess, (state, action) => ({
    ...state,
    loading: false,
    since: action.since,
    page: action.page,
  })),
);

export const { selectAll } = adapter.getSelectors();
