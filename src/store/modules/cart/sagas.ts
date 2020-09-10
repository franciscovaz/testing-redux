import { all, takeLatest, select } from "redux-saga/effects";
import { addProductToCart } from "./actions";
import { IState } from "../..";

type CheckProductStockRequest = ReturnType<typeof addProductToCart>;

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;
  const currentQuantity: number = yield select((state: IState) => {
    // verificar se algo nao existe para retornar um padrao (??)
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });

  console.log(currentQuantity);
  console.log("Vou adicionar ao carro");
}

export default all([takeLatest("ADD_PRODUCT_TO_CART", checkProductStock)]);
