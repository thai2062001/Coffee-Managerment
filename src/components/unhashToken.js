// unhashToken.js
import { jwtDecode } from "jwt-decode";

const unhashToken = (token) => {
  if (!token) {
    // Nếu không có token, trả về null hoặc thực hiện hành động phù hợp với ứng dụng của bạn
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default unhashToken;
