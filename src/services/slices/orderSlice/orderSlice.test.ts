import orderReducer, {
  orderBurger,
  getOrders,
  getOrderByNumber,
  resetOrderItem,
  resetOrders,
  initialState
} from './orderSlice';
import { TOrder } from '@utils-types';

describe('orderSlice', () => {
  const order_1 = {
    _id: '1',
    status: 'done',
    name: 'Бургер',
    createdAt: '2025-05-31',
    updatedAt: '2025-05-30',
    number: 1,
    ingredients: ['ingredient_1', 'ingredient_2']
  };
  const order_2 = {
    _id: '2',
    status: 'done',
    name: 'Бургер 2',
    createdAt: '2025-05-31',
    updatedAt: '2025-05-30',
    number: 1,
    ingredients: ['ingredient_1', 'ingredient_2']
  };

  it('should return the initial state', () => {
    expect(orderReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should handle resetOrderItem', () => {
    const stateWithOrderItem = { ...initialState, orderItem: order_1 };
    const action = resetOrderItem();
    const state = orderReducer(stateWithOrderItem, action);
    expect(state).toEqual(initialState);
  });

  it('should handle resetOrders', () => {
    const stateWithOrders = { ...initialState, orders: [order_1, order_2] };
    const action = resetOrders.type;
    const state = orderReducer(stateWithOrders, { type: action });
    expect(state).toEqual(initialState);
  });

  describe('orderBurger action', () => {
    it('should handle orderBurger.pending', () => {
      const action = orderBurger.pending.type;
      const state = orderReducer(initialState, { type: action });
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle orderBurger.rejected', () => {
      const action = {
        type: orderBurger.rejected.type,
        error: { message: 'Error fetching' }
      };
      const state = orderReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Error fetching');
    });

    it('should handle orderBurger.fulfilled', () => {
      const orderBurgerResponse = {
        success: true,
        order: order_1,
        name: 'Бургер'
      };
      const action = {
        type: orderBurger.fulfilled.type,
        payload: orderBurgerResponse
      };
      const state = orderReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.name).toBe(orderBurgerResponse.name);
      expect(state.orderItem).toEqual(orderBurgerResponse.order);
    });
  });

  describe('getOrders action', () => {
    it('should handle getOrders.pending', () => {
      const action = getOrders.pending.type;
      const state = orderReducer(initialState, { type: action });
      expect(state).toBe(initialState);
    });

    it('should handle getOrders.rejected', () => {
      const action = {
        type: getOrders.rejected.type,
        error: { message: 'Error fetching' }
      };
      const state = orderReducer(initialState, action);
      expect(state.error).toBe('Error fetching');
    });

    it('should handle getOrders.fulfilled', () => {
      const orderResponse = [order_1];
      const action = getOrders.fulfilled(orderResponse, '');
      const state = orderReducer(initialState, action);
      expect(state.orders).toHaveLength(1);
      expect(state.orders).toEqual(orderResponse);
    });
  });

  describe('getOrderByNumber action', () => {
    it('should handle getOrderByNumber.pending', () => {
      const action = getOrderByNumber.pending.type;
      const state = orderReducer(initialState, { type: action });
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle getOrderByNumber.rejected', () => {
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: 'Error fetching' }
      };
      const state = orderReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('Error fetching');
    });

    it('should handle getOrderByNumber.fulfilled', () => {
      const orders = [order_1, order_2];
      const orderResponse = {
        success: true,
        orders: [order_1]
      };
      const action = getOrderByNumber.fulfilled(orderResponse, '', 1);
      const state = orderReducer(initialState, action);
      expect(state.orderItem).toEqual(orderResponse.orders[0]);
      expect(state.loading).toBe(false);
    });
  });
});
