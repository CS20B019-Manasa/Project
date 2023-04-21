import { createContext, useState } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

export function StoreProvider(props) {
  const [state, setState] = useState(initialState);

  const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setState((prevState) => ({ ...prevState, cart: { ...prevState.cart, cartItems } }));
  };

  const addToCart = (newItem) => {
    const existItem = state.cart.cartItems.find(
      (item) => item._id === newItem._id
    );
    const cartItems = existItem
      ? state.cart.cartItems.map((item) =>
          item._id === existItem._id ? newItem : item
        )
      : [...state.cart.cartItems, newItem];
    setCartItems(cartItems);
  };

  const removeFromCart = (itemToRemove) => {
    const cartItems = state.cart.cartItems.filter(
      (item) => item._id !== itemToRemove._id
    );
    setCartItems(cartItems);
  };

  const incrementCartItem = (itemToIncrement) => {
    const cartItems = state.cart.cartItems.map((item) =>
      item._id === itemToIncrement._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(cartItems);
  };

  const decrementCartItem = (itemToDecrement) => {
    const cartItems = state.cart.cartItems.map((item) =>
      item._id === itemToDecrement._id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter((item) => item.quantity > 0);
    setCartItems(cartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    state,
    setCartItems,
    addToCart,
    removeFromCart,
    incrementCartItem,
    decrementCartItem,
    clearCart
  };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
