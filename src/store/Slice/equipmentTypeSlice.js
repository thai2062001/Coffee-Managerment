// staffReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
const equipmentSlice = createSlice({
  name: "type",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchEquipmentStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchEquipmentSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchEquipmentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addEquipment(state, action) {
      state.list.push(action.payload);
    },
    deleteEquipment(state, action) {
      state.list = state.list.filter((role) => role.role_id !== action.payload);
    },
  },
});

export const {
  fetchEquipmentStart,
  fetchEquipmentFailure,
  addEquipment,
  deleteEquipment,
} = equipmentSlice.actions;

export const fetchEquipmentSuccess = (data) => ({
  type: "FETCH_EQUIPMENT_TYPE_SUCCESS",
  payload: data,
});

export const fetchEquipmentData = () => async (dispatch) => {
  try {
    dispatch(fetchEquipmentStart());
    const response = await callAPINoHead(
      path.API_BASE_URL + path.EQUIPTYPE_API_URL,
      "GET"
    );
    dispatch(fetchEquipmentSuccess(response));
  } catch (error) {
    dispatch(fetchEquipmentFailure(error.message));
  }
};
export const addEquipmentData = (newEquipment) => async (dispatch) => {
  try {
    // Gửi yêu cầu thêm vai trò đến API và nhận lại dữ liệu vai trò mới
    const response = await callAPINoHead(
      path.API_BASE_URL + path.EQUIPTYPE_API_URL,
      "POST",
      newEquipment
    );
    // Sau khi thêm thành công, dispatch action để cập nhật Redux store
    dispatch(addEquipment(response));
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error adding role:", error);
  }
};
export const deleteEquipmentData = (equimentTypeId) => async (dispatch) => {
  try {
    await callAPINoHead(
      `${path.API_BASE_URL}${path.EQUIPTYPE_API_URL}/${equimentTypeId}`,
      "DELETE"
    );
    dispatch(deleteEquipment(equimentTypeId));
  } catch (error) {
    console.error("Error deleting role:", error);
  }
};

export default equipmentSlice.reducer;
