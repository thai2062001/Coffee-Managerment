// staffReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead, callAPIHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
const staffSlice = createSlice({
  name: "staff",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchStaffStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStaffSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchStaffFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchReportStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchReportSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchReportFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAttendanceStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAttendanceSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchAttendanceFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addReport(state, action) {
      state.list.push(action.payload);
    },
  },
});

export const {
  fetchStaffStart,
  fetchStaffFailure,
  fetchReportStart,
  fetchReportFailure,
  fetchAttendanceFailure,
  fetchAttendanceStart,
  addReport,
} = staffSlice.actions;

export const fetchStaffSuccess = (data) => ({
  type: "FETCH_STAFF_SUCCESS",
  payload: data,
});
export const fetchReportSuccess = (data) => ({
  type: "FETCH_REPORT_SUCCESS",
  payload: data,
});
export const fetchAttendanceSuccess = (data) => ({
  type: "FETCH_ATTENDANCE_SUCCESS",
  payload: data,
});

export const fetchStaffData = () => async (dispatch) => {
  try {
    dispatch(fetchStaffStart());
    const response = await callAPIHead(
      path.API_BASE_URL + path.STAFF_API_URL,
      "GET"
    );
    dispatch(fetchStaffSuccess(response));
  } catch (error) {
    dispatch(fetchStaffFailure(error.message));
  }
};
export const fetchAttendanceData = () => async (dispatch) => {
  try {
    dispatch(fetchAttendanceStart());
    const response = await callAPIHead(
      path.API_BASE_URL + path.STAFF_API_GET_ATTEDANCE,
      "GET"
    );
    dispatch(fetchAttendanceSuccess(response));
  } catch (error) {
    dispatch(fetchAttendanceFailure(error.message));
  }
};

export const fetchReportData = () => async (dispatch) => {
  try {
    dispatch(fetchReportStart());
    const response = await callAPIHead(
      path.API_BASE_URL + path.STAFF_API_GET_REPORT,
      "GET"
    );
    dispatch(fetchReportSuccess(response));
  } catch (error) {
    dispatch(fetchReportFailure(error.message));
  }
};
export const addReportData = (newReport) => async (dispatch) => {
  try {
    // Gửi yêu cầu thêm vai trò đến API và nhận lại dữ liệu vai trò mới
    const response = await callAPIHead(
      path.API_BASE_URL + path.STAFF_API_REPORT,
      "POST",
      newReport
    );

    // Sau khi thêm thành công, dispatch action để cập nhật Redux store
    dispatch(addReport(response));
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error adding role:", error);
  }
};
export default staffSlice.reducer;
