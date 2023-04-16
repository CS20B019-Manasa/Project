import { createContext, useState } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};


export function StoreProvider(props) {
  const [state, setState] = useState(initialState);

  const addToCart = (item) => {
    setState({
      ...state,
      cart: {
        ...state.cart,
        cartItems: [...state.cart.cartItems, item],
      },
    });
  };

  const value = { state, addToCart };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
