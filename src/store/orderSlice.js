import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "lib/axios/Interceptor";
import { ENP_GET_ALL_ORDER, ENP_GET_ALL_PAID_ORDER } from "api/EndPoint";

// First, create the thunk
export const getAllPaidOrder = createAsyncThunk("order-paid/all", async () => {
  const response = await axios.get(ENP_GET_ALL_PAID_ORDER);

  return response.data;
});

export const getAllOrder = createAsyncThunk("order/all", async () => {
  const response = await axios.get(ENP_GET_ALL_ORDER);

  return response.data;
});

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    paidOrder: [],
    totalPrice: 0,
    numberOrder: 0,
  },
  reducers: {
    updateOrderStatus: (state, action) => {
      const id = action.payload.id;
      const status = action.payload.status;
      const note = action.payload.note;
      state.orders.forEach((value) => {
        if (value._id === id) {
          value.status = status;
          if (note) {
            value.note = note;
          }
        }
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllPaidOrder.fulfilled, (state, action) => {
        state.paidOrder = action.payload.orders;
        state.numberOrder = action.payload.orders.length;

        for (let order of action.payload.orders) {
          state.totalPrice += order.totalPrice;
        }
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
      });
  },
});
// Action creators are generated for each case reducer function
// export const { categoryAdded, categoryDeleteWithId, categoryUpdated } =
// orderSlice.actions;

export const selectPaidOrder = (state) => state.orders.paidOrder;
export const selectOrder = (state) => state.orders.orders;
export const selectTotalPrice = (state) => state.orders.totalPrice;
export const selectNumberOfOrder = (state) => state.orders.numberOrder;

export const { updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
