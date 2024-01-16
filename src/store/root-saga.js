import { all, call, put, takeEvery  } from 'redux-saga/effects';

// import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.saga';


// function* logUserFetch() {
//   console.log('Fetching users...');
// }

// function* fetchUsers() {
//   try {
//     yield put(logUserFetch());
//     const response = yield call(useGetUsersQuery().unwrap);
//     console.log('Users:', response);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//   }
// }

// function* watchFetchUsers() {
//   yield takeEvery('users/fetchUsers', fetchUsers);
// }


export function* rootSaga() {
  // yield all([call(categoriesSaga), call(userSagas)]);
  yield all([ call(userSagas)]);
}
