export const loginStart = () => ({
  type: 'LOGIN_START',
});
export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});
export const loginFailure = () => ({
  type: 'LOGIN_FAILURE',
});

// UPDATE PROFILE

export const updateStart = () => ({
  type: 'UPDATE_USER_START',
});
export const updateSuccess = (user) => ({
  type: 'UPDATE_USER_SUCCESS',
  payload: user,
});
export const updateFailure = () => ({
  type: 'UPDATE_USER_FAILURE',
});

// LOGOUT
export const logout = () => ({
  type: 'LOGOUT',
});
