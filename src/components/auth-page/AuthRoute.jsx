import { Navigate } from "react-router-dom";

// Cookie
import Cookies from "js-cookie";

// Utils
import { showErrorToast } from "../../utils/Toast";

export const AuthRoute = ({ element }) => {
  const token = Cookies.get("token");

  if (!token) {
    showErrorToast("Harap login dulu untuk akses halaman ini");
    return <Navigate to="/login" replace />;
  }

  return element;
};
