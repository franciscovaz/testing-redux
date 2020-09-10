import { all } from "redux-saga/effects";

import cart from "./cart/sagas";

// o * (generator) é como uma função async
export default function* rootSaga() {
  // yeld é como o await
  return yield all([cart]);
}
