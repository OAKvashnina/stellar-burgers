import userReducer, {
  getUser,
  loginUser,
  logout,
  updateUser,
  initialState
} from './userSlice';
import { TRegisterData } from '@api';

describe('userSlice', () => {
  const response = {
    success: true,
    user: {
      email: 'ivanov@ru.ru',
      name: 'Иван'
    }
  };

  const data: TRegisterData = {
    email: 'ivanov@ru.ru',
    name: 'Иван',
    password: '11111'
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should handle getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle getUser.rejected', () => {
    const action = {
      type: getUser.rejected.type,
      error: { message: 'Error fetching' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      error: 'Error fetching'
    });
  });

  it('should handle getUser.fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: response
    };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: {
        email: 'ivanov@ru.ru',
        name: 'Иван'
      },
      isAuthChecked: true,
      isAuth: true,
      loading: false,
      error: null
    });
  });

  it('should handle loginUser.pending', () => {
    const { email, password } = data;
    const state = userReducer(
      initialState,
      loginUser.pending('', { email, password })
    );
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('should handle loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      error: 'Error'
    });
  });

  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: data
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuth: true,
      loading: false,
      error: null,
      user: {
        name: 'Иван',
        email: 'ivanov@ru.ru',
        password: '11111'
      }
    });
  });

  it('should handle logout.fulfilled', () => {
    const actualState = {
      ...initialState,
      isAuthChecked: false,
      user: {
        name: 'Иван',
        email: 'ivanov@ru.ru'
      }
    };
    const action = logout.fulfilled({ success: true }, '', undefined);
    const state = userReducer(actualState, action);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  it('should handle updateUser.pending', () => {
    const action = {
      type: updateUser.pending.type
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('should handle updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Error fetching' }
    };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error fetching');
    expect(state.user).toBeNull();
  });

  it('should handle fulfilled action', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: response
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuth: true,
      error: null,
      loading: false,
      user: {
        name: 'Иван',
        email: 'ivanov@ru.ru'
      }
    });
  });
});
