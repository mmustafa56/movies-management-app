import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios"; 
import { loginSuccess } from "../services/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        const response = await axios.post("http://localhost:8000/apis/user/login", values);
        
        const { user, token, message } = response.data;
        toast.success(message);
        console.log("jasdhfaskjdhfskjdhfsjdxfcs")
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        dispatch(loginSuccess(user));
        navigate("/home")
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 404) {
          toast.error("Incorrect username or password. Please try again.");
        } else {
          toast.error("Login failed. Please try again later.");
        }
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8  rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-green-900 mb-6">Login</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-md mt-2 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-md mt-2 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-green-800 text-white rounded-md hover:bg-green-700 focus:outline-none"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <Link to="/register" className="text-green-600 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
