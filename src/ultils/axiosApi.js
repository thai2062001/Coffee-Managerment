import axios from "axios";

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

export { callAPI, callAPINoHead, callAPIDelete, callAPIPost };
