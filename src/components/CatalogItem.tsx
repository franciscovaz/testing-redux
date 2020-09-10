import React, { useCallback } from "react";
import { IProduct } from "../store/modules/cart/types";
import { addProductToCartRequest } from "../store/modules/cart/actions";
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

  return (
    <article key={product.id}>
      <strong>{product.title}</strong> {" - "}
      <span>{product.price}</span>
      <button type="button" onClick={handleAddProductToCart}>
        Comprar
      </button>
      {hasFailedStockCheck && (
        <span style={{ color: "red" }}>Falta de stock</span>
      )}
    </article>
  );
};

export default CatalogItem;
