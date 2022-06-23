import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { axios } from "lib/axios/Interceptor";
import { ENP_CATEGORY } from "api/EndPoint";

export const categoryAdapter = createEntityAdapter({
  selectId: (category) => category.name,
});
const initialState = categoryAdapter.getInitialState();

// First, create the thunk
export const getAllCategories = createAsyncThunk("category/all", async () => {
  const response = await axios.get(ENP_CATEGORY);

  return response.data;
});
export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoryDeleteWithId: categoryAdapter.removeOne,

    categoryAdded: categoryAdapter.addOne,

    categoryUpdated: categoryAdapter.updateOne,
  },

  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      categoryAdapter.upsertMany(state, action.payload.category);
    });
  },
});
// Action creators are generated for each case reducer function
export const { categoryAdded, categoryDeleteWithId, categoryUpdated } =
  categorySlice.actions;

export const {
  selectById: selectCategoryById,
  selectAll: selectAllCategories,
} = categoryAdapter.getSelectors((state) => state.categories);

export default categorySlice.reducer;
