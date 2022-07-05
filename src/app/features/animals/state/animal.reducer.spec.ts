import * as fromAnimalState from './animal.reducer';
import * as fromAnimalActions from './animal.actions';
import { adapter } from './animal.reducer';
import { AnimalView } from '../models/animal-view.model';

describe('Animal Reducer', () => {
  const init = { type: '@@init' } as any;
  const since = 20;
  const page = 30;
  const loading = false;
  const automaticLoader = false;
  const message = 'test';
  const animal = { id: 1, name: 'name', image: 'image' };
  const initialState = {
    ids: [animal.id],
    entities: { 1: animal },
    loading,
    message,
    automaticLoader,
    since,
    page,
  };

  it('should return the initial state', () => {
    const state = fromAnimalState.reducer(initialState, { type: '@@init' as any });
    expect(state).toEqual(initialState);
  });

  it('should load animals', () => {
    const loadAnimals = fromAnimalActions.loadAnimals();
    const state = [init, loadAnimals].reduce(fromAnimalState.reducer, initialState);

    expect(state.loading).toEqual(true);
  });

  it('should load animals automatically', () => {
    const loadAnimalsAutomatic = fromAnimalActions.automaticLoadAnimals();
    const state = [init, loadAnimalsAutomatic].reduce(fromAnimalState.reducer, initialState);

    expect(state.loading).toEqual(!automaticLoader);
  });

  it('should load animals sucessfully', () => {
    const animals: AnimalView[] = [animal];
    const loadAnimalsSuccess = fromAnimalActions.loadAnimalsSuccess({ animals });
    const state = [init, loadAnimalsSuccess].reduce(fromAnimalState.reducer, initialState);

    expect(state.loading).toEqual(false);
    expect(state).toEqual({
      ...adapter.setAll(animals, initialState),
      loading: false,
      since: animal.id,
      message: '',
    });
  });

  it('should automatic load animals sucessfully', () => {
    const animals: AnimalView[] = [animal];
    const automaticLoadAnimalsSuccess = fromAnimalActions.automaticLoadAnimalsSuccess({ animals });
    const state = [init, automaticLoadAnimalsSuccess].reduce(fromAnimalState.reducer, initialState);

    expect(state.loading).toEqual(false);
    expect(state).toEqual({
      ...adapter.setAll(animals, initialState),
      loading: false,
      since: animal.id,
      message: '',
    });
  });

  it('should fail to load animals', () => {
    const loadAnimalsFailed = fromAnimalActions.loadAnimalsFailed({ message });
    const state = [init, loadAnimalsFailed].reduce(fromAnimalState.reducer, initialState);

    expect(state.loading).toEqual(false);
    expect(state.message).toEqual(message);
  });

  it('should fail to automatic load animals', () => {
    const automaticLoadAnimalsFailed = fromAnimalActions.automaticLoadAnimalsFailed({ message });
    const state = [init, automaticLoadAnimalsFailed].reduce(fromAnimalState.reducer, initialState);

    expect(state.loading).toEqual(false);
    expect(state.message).toEqual(message);
  });

  it('should toggle automatic loader option', () => {
    const toggleAutomaticAnimalLoader = fromAnimalActions.toggleAutomaticAnimalLoader();
    const state = [init, toggleAutomaticAnimalLoader].reduce(fromAnimalState.reducer, initialState);

    expect(state.automaticLoader).toEqual(true);
  });

  it('should dismiss error message', () => {
    const dismissMessage = fromAnimalActions.dismissMessage();
    const state = [init, dismissMessage].reduce(fromAnimalState.reducer, {
      ...initialState,
      message,
    });

    expect(state.message).toEqual('');
  });

  it('should load parameters', () => {
    const loadAnimals = fromAnimalActions.loadParameters();
    const state = [init, loadAnimals].reduce(fromAnimalState.reducer, initialState);

    expect(state.loading).toEqual(true);
  });

  it('should load parameters sucessfully', () => {
    const loadAnimals = fromAnimalActions.loadParametersSucess({
      since: since + 1,
      page: page + 1,
    });
    const state = [init, loadAnimals].reduce(fromAnimalState.reducer, initialState);

    expect(state.loading).toEqual(false);
    expect(state.since).toEqual(since + 1);
    expect(state.page).toEqual(page + 1);
  });
});
