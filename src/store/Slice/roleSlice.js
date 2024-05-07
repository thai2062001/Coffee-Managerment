// staffReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
const roleSlice = createSlice({
  name: "role",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchRoleStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRoleSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchRoleFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addRole(state, action) {
      state.list.push(action.payload);
    },
  },
});

export const { fetchRoleStart, fetchRoleFailure, addRole } = roleSlice.actions;

export const fetchRoleSuccess = (data) => ({
  type: "FETCH_ROLE_SUCCESS",
  payload: data,
});

export const fetchRoleData = () => async (dispatch) => {
  try {
    dispatch(fetchRoleStart());
    const response = await callAPINoHead(
      path.API_BASE_URL + path.ROLE_API_URL,
      "GET"
    );
    dispatch(fetchRoleSuccess(response));
  } catch (error) {
    dispatch(fetchRoleFailure(error.message));
  }
};
export const addRoleData = (newRole) => async (dispatch) => {
  try {
    // Gửi yêu cầu thêm vai trò đến API và nhận lại dữ liệu vai trò mới
    const response = await callAPINoHead(
      path.API_BASE_URL + path.ROLE_API_URL,
      "POST",
      newRole
    );
    // Sau khi thêm thành công, dispatch action để cập nhật Redux store
    dispatch(addRole(response));
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error adding role:", error);
  }
};

export default roleSlice.reducer;
