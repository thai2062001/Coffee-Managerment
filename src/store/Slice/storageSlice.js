// staffReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead, callAPIHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";

const storageSlice = createSlice({
  name: "storage",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchStorageStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStorageSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchStorageFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addStorage(state, action) {
      state.list.push(action.payload);
    },
    deleteStorage(state, action) {
      state.list = state.list.filter((role) => role.role_id !== action.payload);
    },
  },
});

export const {
  fetchStorageStart,
  fetchStorageFailure,
  addStorage,
  deleteStorage,
} = storageSlice.actions;

export const fetchStorageSuccess = (data) => ({
  type: "FETCH_STORAGE_SUCCESS",
  payload: data,
});

export const fetchStorageData = () => async (dispatch) => {
  try {
    dispatch(fetchStorageStart());
    const response = await callAPINoHead(
      path.API_BASE_URL + path.STORAGE_API_URL,
      "GET"
    );
    dispatch(fetchStorageSuccess(response));
  } catch (error) {
    dispatch(fetchStorageFailure(error.message));
  }
};
export const addStorageData = (newStorage) => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    // Gửi yêu cầu thêm vai trò đến API và nhận lại dữ liệu vai trò mới
    const response = await callAPIHead(
      path.API_BASE_URL + path.STORAGE_API_URL,
      "POST",
      newStorage,
      accessToken
    );

    // Sau khi thêm thành công, dispatch action để cập nhật Redux store
    dispatch(addStorage(response));
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error adding role:", error);
  }
};
export const deleteStorageData = (storage_id) => async (dispatch) => {
  try {
    const apiUrl = `${path.API_BASE_URL}${path.DELETED_STORAGE_API_URL}/'1'}`;
    console.log("API URL:", apiUrl);
    await callAPINoHead(
      `${path.API_BASE_URL}${path.DELETED_STORAGE_API_URL}/${storage_id}`,
      "PATCH"
    );

    dispatch(deleteStorage(storage_id));
  } catch (error) {
    console.error("Error deleting role:", error);
  }
};
export default storageSlice.reducer;
