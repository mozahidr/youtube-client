import axios from 'axios';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  updateStart,
  updateFailure,
  updateSuccess,
} from './AuthAction';

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post('auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// update user
export const updateUser = async (user, userInfo, dispatch) => {
  dispatch(updateStart());
  try {
    const res = await axios.put(
      'http://localhost:5001/api/users/' + userInfo + user,
      updateUser,
      {
        headers: {
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
      }
    );
    dispatch(updateSuccess(res.data));
    console.log(res.data);
  } catch (err) {
    dispatch(updateFailure());
  }
};
