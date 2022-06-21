import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENP_GET_PRODUCT, ENP_GET_PRODUCT_BY_CATEGORY } from "api/EndPoint";
import axios from "axios";

export const getAllProduct = createAsyncThunk("product/getAll", async () => {
  const response = await axios.get(
    process.env.REACT_APP_BACKEND_URL + ENP_GET_PRODUCT
  );
  return response.data;
});

export const getProductByCategory = createAsyncThunk(
  "product/getProductByCategory",
  async (categoryName) => {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_URL +
        ENP_GET_PRODUCT_BY_CATEGORY +
        categoryName
    );
    return response.data;
  }
);

export const getProductWithName = createAsyncThunk(
  "products/search",
  async (searchTerm, { getState, dispatch }) => {
    const url = ENP_GET_PRODUCT + "search?keyword=" + searchTerm;
    const response = await axios.get(url, {
      params: {
        pageSize: 100,
      },
    });
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isError: false,
  },
  reducers: {
    // logout: (state) => {
    //   LocalStorageService.clearToken("auth");
    //   LocalStorageService.clearToken("refresh");
    //   state.curUser = null;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.products = action.payload.product;
    });
    builder.addCase(getProductByCategory.fulfilled, (state, action) => {
      state.products = action.payload.products;
    });
  },
});

export const selectProduct = (state) => state.product.products;

export default productSlice.reducer;
