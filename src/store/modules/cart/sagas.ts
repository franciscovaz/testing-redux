import { all, takeLatest, select, call, put } from "redux-saga/effects";
import {
  addProductToCartRequest,
  addProductToCartSuccess,
  addProductToCartFailure,
  removeProductFromCartRequest,
} from "./actions";
import { IState } from "../..";
import api from "../../../services/api";
import { AxiosResponse } from "axios";
import { ActionTypes } from "./types";

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

type CheckProductRemovedRequest = ReturnType<
  typeof removeProductFromCartRequest
>;
interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;
  const currentQuantity: number = yield select((state: IState) => {
    // verificar se algo nao existe para retornar um padrao (??)
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(
    api.get,
    `stock/${product.id}`
  );

  if (availableStockResponse.data.quantity > currentQuantity) {
    // PUT é o mesmo que o dispatch
    // Todos os metodos que veem do SAGA levam com o yield
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

function* checkSomethingOnRemove({ payload }: CheckProductRemovedRequest) {
  console.log("Middleware/Saga called");
  const { productId } = payload;

  console.log("Produto:", productId);

  yield call(api.get, `stock/${productId}`);
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
  takeLatest(ActionTypes.removeProductFromCartRequest, checkSomethingOnRemove),
]);
