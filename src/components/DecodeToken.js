import { jwtDecode } from "jwt-decode";

const decodeToken = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.role_id; // Assumes the token has a `role_id` field
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  return null;
};

const decodeTokenName = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.phone_number; // Assumes the token has a `role_id` field
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  return null;
};
export { decodeToken, decodeTokenName };
