import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead } from "../../ultils/axiosApi";
import {
  showSuccessNotification,
  showFailureNotification,
} from "../../ultils/notificationUtils";
import { path } from "../../ultils/constant";

// Định nghĩa slice cho Bill
const BillSlice = createSlice({
  name: "bill",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchBillStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBillSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchBillFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addBill(state, action) {
      state.list.push(action.payload);
    },
  },
});

export const { fetchBillStart, fetchBillFailure, addBill } = BillSlice.actions;
export const fetchBillSuccess = (data) => ({
  type: "FETCH_BILL_SUCCESS",
  payload: data,
});

// Thunk action để fetch dữ liệu hóa đơn
export const fetchBillData = () => async (dispatch) => {
  try {
    dispatch(fetchBillStart());
    const response = await callAPINoHead(
      `${path.API_BASE_URL}${path.BILL_API_URL}`,
      "GET"
    );
    dispatch(fetchBillSuccess(response));
  } catch (error) {
    dispatch(fetchBillFailure(error.message));
  }
};

// Thunk action để thêm dữ liệu hóa đơn
export const addBillData = (newBill) => async (dispatch) => {
  try {
    const response = await callAPINoHead(
      `${path.API_BASE_URL}${path.BILL_API_URL}`,
      "POST",
      newBill
    );

    dispatch(addBill(response));
  } catch (error) {
    showFailureNotification("Lỗi", "Không thể thêm hóa đơn");
    console.error("Lỗi khi thêm hóa đơn:", error);
  }
};

export default BillSlice.reducer;
