import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",

  // initialState: {
  //   Product: [],
  // },

  initialState: {
    products: [],
  },

  reducers: {
    // setProducts: (state, action) => {
    //   // console.log("Action payload",action.payload)
    //   state.Product = action.payload;
    // },
    getAllPrioducts: (state, action) => {
      state.products = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
