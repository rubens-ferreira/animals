import * as fromAnimal from './animal.reducer';
import {
  selectAnimalState,
  selectLoading,
  selectMessage,
  selectAutomaticLoader,
  selectAll,
  selectSince,
  selectPage,
} from './animal.selectors';

describe('Animal Selectors', () => {
  const since = 20;
  const page = 30;
  const loading = true;
  const automaticLoader = true;
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
  const state: fromAnimal.State = initialState;

  it('should select the initial state', () => {
    const result = selectAnimalState.projector(state);
    expect(result).toEqual(state);
  });

  it('should select the loading value', () => {
    const result = selectLoading.projector(state);
    expect(result).toEqual(loading);
  });

  it('should select the message', () => {
    const result = selectMessage.projector(state);
    expect(result).toEqual(message);
  });

  it('should select the automatic loader value', () => {
    const result = selectAutomaticLoader.projector(state);
    expect(result).toEqual(automaticLoader);
  });

  it('should select all animals', () => {
    const result = selectAll({
      [fromAnimal.animalsFeatureKey]: state,
    });
    expect(result).toEqual([animal]);
  });

  it('should select the since value', () => {
    const result = selectSince.projector(state);
    expect(result).toEqual(since);
  });

  it('should select the page value', () => {
    const result = selectPage.projector(state);
    expect(result).toEqual(page);
  });
});
