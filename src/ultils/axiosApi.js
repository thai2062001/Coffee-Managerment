import axios from "axios";
const access_Token = localStorage.getItem("accessToken");
const callAPI = async (url, method, data = null, headers = {}) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
    });

    // Trả về dữ liệu từ API nếu thành công
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu gọi API không thành công
    console.error("API call failed:", error);
    throw error; // Chuyển lỗi cho phần gọi API xử lý
  }
};

const callAPINoHead = async (url, method, data = null) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};
const callAPIDelete = async (url) => {
  try {
    const response = await axios.delete(url);

    // Trả về dữ liệu từ API nếu thành công (trong trường hợp cần)
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu gọi API không thành công
    console.error("API delete failed:", error);
    throw error; // Chuyển lỗi cho phần gọi API xử lý
  }
};
const callApiUpdate = async (url) => {
  try {
    const response = await axios.patch(url);

    // Trả về dữ liệu từ API nếu thành công (trong trường hợp cần)
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu gọi API không thành công
    console.error("API update failed:", error);
    throw error; // Chuyển lỗi cho phần gọi API xử lý
  }
};
const callAPIPost = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    // Trả về dữ liệu từ API nếu thành công
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu gọi API không thành công
    console.error("API post failed:", error);
    throw error; // Chuyển lỗi cho phần gọi API xử lý
  }
};
const callAPIPostMulti = async (url, formData) => {
  try {
    // Tạo yêu cầu POST với dữ liệu là FormData
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Đặt kiểu nội dung là multipart/form-data
      },
    });

    // Trả về dữ liệu từ API nếu thành công
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu gọi API không thành công
    console.error("API post failed:", error);
    throw error; // Chuyển lỗi cho phần gọi API xử lý
  }
};
const callAPIPatchMulti = async (url, formData) => {
  try {
    // Tạo yêu cầu PATCH với dữ liệu là FormData
    const response = await axios.patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Đặt kiểu nội dung là multipart/form-data
      },
    });

    // Trả về dữ liệu từ API nếu thành công
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu gọi API không thành công
    console.error("API patch failed:", error);
    throw error; // Chuyển lỗi cho phần gọi API xử lý
  }
};

const callAPIHead = async (url, method, data = null, token = null) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    token = accessToken;
    console.log(token);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios({ method, url, data, headers });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export {
  callAPI,
  callAPINoHead,
  callAPIDelete,
  callAPIPost,
  callApiUpdate,
  callAPIHead,
  callAPIPostMulti,
  callAPIPatchMulti,
};
