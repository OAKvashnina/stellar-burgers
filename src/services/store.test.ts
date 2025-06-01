import { initialState as ingredientsReducer } from '../services/slices/ingredientSlice/ingredientSlice';
import { initialState as constructorReducer } from '../services/slices/constructorSlice/constructorSlice';
import { initialState as orderReducer } from '../services/slices/orderSlice/orderSlice';
import { initialState as feedReducer } from '../services/slices/feedSlice/feedSlice';
import { initialState as userReducer } from '../services/slices/userSlice/userSlice';

import store from './store';

const initialState = {
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  user: userReducer
};

describe('rootReducer', () => {
  it('should initialize', () => {
    const state = store.getState();
    expect(state).toEqual(initialState);
  });

  it('should unknownAction type', () => {
    const action = { type: 'unknownAction' };
    store.dispatch(action);
    const state = store.getState();
    expect(state).toEqual(initialState);
  });

  it('should update states ', () => {
    const action = {
      type: 'burgerConstructor/addIngredient',
      payload: {
        type: 'bun',
        name: 'Булка'
      }
    };
    const newState = {
      bun: { name: 'Булка', type: 'bun' },
      ingredients: []
    };
    store.dispatch(action);
    const state = store.getState();
    expect(state.burgerConstructor).toEqual(newState);
  });
});
