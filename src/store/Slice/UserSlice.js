import { createSlice } from "@reduxjs/toolkit";
import { callAPIHead, callAPINoHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
import {
  showSuccessNotification,
  showFailureNotification,
} from "../../ultils/notificationUtils";

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
    loginUserStart(state) {
      state.loading = true;
    },
    loginUserSuccess(state, action) {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    loginUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    logoutUser(state) {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const {
  fetchUserStart,
  fetchUserFailure,
  addUser,
  deleteUser,
  loginUserSuccess,
  loginUserFailure,
  loginUserStart,
  fetchUserSuccess,
  logoutUser,
} = UserSlice.actions;

export const loginUser = (user, navigate) => async (dispatch) => {
  try {
    dispatch(loginUserStart());
    const response = await callAPINoHead(
      path.API_BASE_URL + path.AUTHOR_API_URL,
      "POST",
      user
    );
    const token = response;
    localStorage.setItem("access-token", token);
    showSuccessNotification("Success", "Login successful! Welcome back");
    dispatch(loginUserSuccess(response));
    window.location.href = "http://localhost:3000/admin/table/storage";
  } catch (error) {
    console.error("Error login user:", error);
    showFailureNotification("Error", "Invalid username or password");
    dispatch(loginUserFailure("Invalid username or password"));
  }
};

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
  }
};

export default UserSlice.reducer;
