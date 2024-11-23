import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../services/userSlice";

export default function RestoreRedux() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");
    if (token && userJson) {
      const user = JSON.parse(userJson);
      dispatch(loginSuccess(user));
    }
  }, []);
  return null;
}
