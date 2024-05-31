import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callAPINoHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
import {
  showSuccessNotification,
  showFailureNotification,
} from "../../ultils/notificationUtils";
import { callAPIHead } from "../../ultils/axiosApi";
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await callAPINoHead(
        path.API_BASE_URL + path.AUTHOR_API_URL,
        "POST",
        user
      );

      console.log("API response:", response);

      if (typeof response === "string") {
        return { accessToken: response };
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error login user:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
    loading: false,
    error: null,
    isLoggedIn: false,
    currentUser: null,
  },
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addUser(state, action) {
      state.list.push(action.payload);
    },
    deleteUser(state, action) {
      state.list = state.list.filter((user) => user.user_id !== action.payload);
    },
    logoutUser(state) {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      });
  },
});

export const {
  fetchUserStart,
  fetchUserFailure,
  addUser,
  deleteUser,
  logoutUser,
} = UserSlice.actions;

export const fetchUserSuccess = (data) => ({
  type: "FETCH_USER_SUCCESS",
  payload: data,
});

export const fetchUserData = () => async (dispatch) => {
  try {
    dispatch(fetchUserStart());
    const response = await callAPINoHead(
      path.API_BASE_URL + path.USER_API_URL,
      "GET"
    );
    dispatch(fetchUserSuccess(response));
  } catch (error) {
    dispatch(fetchUserFailure(error.message));
  }
};

export const addUserData = (newUser) => async (dispatch) => {
  try {
    const response = await callAPIHead(
      path.API_BASE_URL + path.USER_API_URL,
      "POST",
      newUser
    );
    dispatch(addUser(response));
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const deleteUserData = (userId) => async (dispatch) => {
  try {
    await callAPINoHead(
      `${path.API_BASE_URL}${path.USER_API_URL}/${userId}`,
      "DELETE"
    );
    dispatch(deleteUser(userId));
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Ném lỗi ra ngoài để handleDelete có thể bắt được
  }
};

export default UserSlice.reducer;
