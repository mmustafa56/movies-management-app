import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios"; // Import Axios
import { loginSuccess } from "../services/userSlice";
import "./Login.css"; // Import the CSS for styling

const Login = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Please enter a valid email.")
        .required("Email is required."),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters.")
        .max(20, "Password must be less than 20 characters.")
        .required("Password is required."),
    }),
    onSubmit: async (values) => {
      try {
        // Make the POST request to your login API
        const response = await axios.post("http://localhost:8000/apis/user/login", values);

        const { user, token, message } = response.data;

        // Show success message
        toast.success(message);

        // Save user and token in local storage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        // Dispatch user login to Redux store
        dispatch(loginSuccess(user));
      } catch (error) {
        // Handle API errors
        if (error.response?.status === 401 || error.response?.status === 404) {
          toast.error("Incorrect username or password. Please try again.");
        } else {
          toast.error("Login failed. Please try again later.");
        }
      }
    },
  });

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
            className={`form-input ${formik.touched.email && formik.errors.email ? "error" : ""}`}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your password"
            className={`form-input ${formik.touched.password && formik.errors.password ? "error" : ""}`}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
      <div className="login-footer">
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
