// import { useContext } from "react";
// import { CartContext } from "../../context/cart.context";

import { useDispatch, useSelector } from "react-redux";

import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount
} from "./cart-icon.styles";

import { selectCartCount } from "../../store/cart/cart.selector";

import { setIsCartOpen } from "../../store/cart/cart.action";

const CartIcon = () => {
  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const cartCount = useSelector(selectCartCount);

  const dispatch = useDispatch();
  const toggleIsCartOpen = () => dispatch(setIsCartOpen());

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;