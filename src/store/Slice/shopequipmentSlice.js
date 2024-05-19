import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
const shopequipmentSlice = createSlice({
  name: "shopequipment",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchShopEquipmentStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchShopEquipmentSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchShopEquipmentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchShopEquipmentStart, fetchShopEquipmentFailure } =
  shopequipmentSlice.actions;

export const fetchShopEquipmentSuccess = (data) => ({
  type: "FETCH_SHOP_EQUIPMENT_SUCCESS",
  payload: data,
});

export const fetchShopEquipmenttData = () => async (dispatch) => {
  try {
    dispatch(fetchShopEquipmentStart());
    const response = await callAPINoHead(
      path.API_BASE_URL + path.SHOPEQUIPMENT_API_URL,
      "GET"
    );
    dispatch(fetchShopEquipmentSuccess(response));
  } catch (error) {
    dispatch(fetchShopEquipmentFailure(error.message));
  }
};

export default shopequipmentSlice.reducer;
