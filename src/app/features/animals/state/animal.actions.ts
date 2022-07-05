import { createAction, props } from '@ngrx/store';
import { AnimalView } from '../models/animal-view.model';

export const loadAnimals = createAction('[Animal List] Load Animals');

export const loadAnimalsSuccess = createAction(
  '[Animal/API] Animals Loaded Sucessfully',
  props<{ animals: AnimalView[] }>(),
);

export const loadAnimalsFailed = createAction(
  '[Animal/API] Error Loading Animals',
  props<{ message: string }>(),
);

export const toggleAutomaticAnimalLoader = createAction(
  '[Animal List] Toggle Automatic Animal List Loading',
);

export const automaticLoadAnimals = createAction('[Timer] Load Animals Automatically');

export const automaticLoadAnimalsSuccess = createAction(
  '[Animal/API] Animals Automatically Loaded Sucessfully',
  props<{ animals: AnimalView[] }>(),
);

export const automaticLoadAnimalsFailed = createAction(
  '[Animal/API] Error Loading Animals Automatically',
  props<{ message: string }>(),
);

export const dismissMessage = createAction('[Animal List] Message Read');

export const loadParameters = createAction('[Animal List] Load Parameters');

export const loadParametersSucess = createAction(
  '[Animal/API] Parameters Loaded Sucessfully',
  props<{ since: number; page: number }>(),
);
