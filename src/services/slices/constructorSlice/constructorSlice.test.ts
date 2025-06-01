import constructorReducer, {
  addIngredient,
  removeIngredient,
  changeOrderIngredients,
  resetConstructor,
  initialState
} from './constructorSlice';
import { TConstructorIngredient } from '@utils-types';
import { TConstructorState } from './constructorSlice';

describe('constructorSlice', () => {
  const ingredient_1: TConstructorIngredient = {
    _id: '2',
    id: '2',
    name: 'Биокотлета',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'ttps://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const ingredient_2: TConstructorIngredient = {
    _id: '4',
    id: '4',
    name: 'Соус',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const bun: TConstructorIngredient = {
    _id: '1',
    id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  it('should handle add ingredient', () => {
    const state = constructorReducer(initialState, addIngredient(ingredient_1));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ingredient_1);
  });

  it('should handle add bun', () => {
    const state = constructorReducer(initialState, addIngredient(bun));
    expect(state.bun).toEqual(bun);
  });

  it('should handle remove ingredient', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [ingredient_1]
    };
    const state = constructorReducer(
      initialState,
      removeIngredient(ingredient_1._id)
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle change Order Ingredients', () => {
    const initialState: TConstructorState = {
      bun: null,
      ingredients: [ingredient_1, ingredient_2]
    };
    const state = constructorReducer(
      initialState,
      changeOrderIngredients({ from: 1, to: 0 })
    );

    expect(state).toEqual({
      bun: null,
      ingredients: [ingredient_2, ingredient_1]
    });
  });

  it('should handle clear constructor', () => {
    const initialState: TConstructorState = {
      bun: bun,
      ingredients: [ingredient_1, ingredient_2]
    };
    const state = constructorReducer(initialState, resetConstructor());
    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});
