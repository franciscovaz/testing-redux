import { Reducer } from "redux";
import produce from "immer";
import { ICartState, ActionTypes } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};

// No 1º momento, em vez de vir undefined, o state fica como INITIAL_STATE
const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  //produce recebe o estado anterior e um rascunho do estado a alterar
  //No final, o produce compara o rascunho com o state e faz as alteraçōes de forma automatica
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        // Só chamos o reducer quando der sucesso na action
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (productInCartIndex >= 0) {
          //existe já no carro
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }
      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);
        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default cart;
