import { takeLatest, put, all, call ,takeEvery,match} from 'redux-saga/effects';

import { useGetPostsQuery } from './userSlice';

export function* check(){
  console.log("check");
  console.log(useGetPostsQuery.isLoading);
  yield takeEvery("useGetPostsQuery", logUserFetch);
}

function* logUserFetch(action) {
  console.log(action);  
  console.log("logUserFetch");
  yield put({ type: 'postFetchLogged', payload: 'Users Fetched!' });
}
// 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

export function* userSagas() {
  console.log('Root saga initialized');
  yield all([
    call(check),

  ]);
  // yield check();
}
