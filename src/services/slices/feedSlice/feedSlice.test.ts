import feedReducer, { getFeeds, initialState, resetFeeds } from './feedSlice';
import { TOrder } from '@utils-types';

describe('feedSlice', () => {
  it('should handle resetFeeds', () => {
    const previousState = {
      orders: [
        {
          _id: '1',
          status: 'pending',
          name: 'orde',
          createdAt: '2025-05-31',
          updatedAt: '2025-05-30',
          number: 1,
          ingredients: ['ingredient_1', 'ingredient_2']
        }
      ],
      total: 1,
      totalToday: 1,
      loading: true,
      error: 'Some error'
    };
    expect(feedReducer(previousState, resetFeeds())).toEqual(initialState);
  });
});

describe('async actions', () => {
  test('should handle getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle getFeeds.rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Error fetching feeds' }
    };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error fetching feeds');
  });

  it('should handle getFeeds.fulfilled', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        status: 'done',
        name: 'Бургер',
        createdAt: '2025-05-31',
        updatedAt: '2025-05-30',
        number: 1,
        ingredients: ['ingredient_1', 'ingredient_2']
      }
    ];
    const total = 1;
    const totalToday = 1;

    const feedResponse = {
      success: true,
      orders,
      total,
      totalToday
    };

    const newState = feedReducer(
      initialState,
      getFeeds.fulfilled(feedResponse, '')
    );

    expect(newState).toEqual({
      orders: orders,
      total: total,
      totalToday: totalToday,
      loading: false,
      error: null
    });
  });
});
