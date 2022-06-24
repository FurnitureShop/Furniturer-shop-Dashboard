import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ENP_GET_PRODUCT,
  ENP_GET_PRODUCT_BY_CATEGORY,
  ENP_PRODUCT,
} from "api/EndPoint";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { axios as axiosAuth } from "lib/axios/Interceptor";
import { storage } from "lib/firebase/firebase";

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

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { getState, dispatch }) => {
    await axiosAuth.delete(`${ENP_PRODUCT}/${id}`);

    return id;
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (data, { getState, dispatch }) => {
    let image;
    let response;
    const { upload, ...othervalue } = data;
    const storageRef = ref(storage, `files/${upload[0].name}`);
    await uploadBytes(storageRef, upload[0].originFileObj).then(
      async (value) => {
        await getDownloadURL(value.ref)
          .then((downloadUrl) => {
            image = [downloadUrl];
          })
          .then(async () => {
            response = await axiosAuth.post(ENP_PRODUCT, {
              ...othervalue,
              image,
            });
          });
      }
    );
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (data, { getState, dispatch }) => {
    let image;
    let response;

    const { upload, ...othervalue } = data;

    const storageRef = ref(storage, `files/${upload[0].name}`);
    if (!data.duplicateImage) {
      await uploadBytes(storageRef, upload[0].originFileObj).then(
        async (value) => {
          await getDownloadURL(value.ref)
            .then((downloadUrl) => {
              image = [downloadUrl];
            })
            .then(async () => {
              response = await axiosAuth.put(ENP_PRODUCT + othervalue._id, {
                ...othervalue,
                image,
              });
            });
        }
      );
    } else {
      response = await axiosAuth.put(ENP_PRODUCT + othervalue._id, othervalue);
    }

    console.log(response);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.products = action.payload.product;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.products = action.payload.products;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.newProductSave);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products.forEach((value, index) => {
          if (value._id === action.payload) {
            state.products.splice(index, 1);
          }
        });
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const id = action.payload.product._id;
        const products = state.products;

        state.products.forEach((value, index) => {
          if (value._id === id) {
            products.splice(index, 1, action.payload.product);
            state.products = products;
          }
        });
      });
  },
});

export const selectProduct = (state) => state.product.products;

export default productSlice.reducer;
