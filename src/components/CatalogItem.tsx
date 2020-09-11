import React, { useCallback } from "react";
import { IProduct } from "../store/modules/cart/types";
import {
  addProductToCartRequest,
  removeProductFromCartRequest,
} from "../store/modules/cart/actions";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../store";

// import { Container } from './styles';

interface ICatalogItemProps {
  product: IProduct;
}

const CatalogItem: React.FC<ICatalogItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector<IState, boolean>((state) => {
    return state.cart.failedStockCheck.includes(product.id);
  });

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  const handleRemoveProductToCart = useCallback(() => {
    dispatch(removeProductFromCartRequest(product.id));
  }, [dispatch, product.id]);

  return (
    <article key={product.id}>
      <strong>{product.title}</strong> {" - "}
      <span>{product.price}</span>
      <button type="button" onClick={handleAddProductToCart}>
        Comprar
      </button>
      <button type="button" onClick={handleRemoveProductToCart}>
        Remover
      </button>
      {hasFailedStockCheck && (
        <span style={{ color: "red" }}>Falta de stock</span>
      )}
    </article>
  );
};

export default CatalogItem;
