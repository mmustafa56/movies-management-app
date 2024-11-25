import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios"; 
import { useDispatch } from "react-redux";
import { loginSuccess } from "../services/userSlice";
import { toast } from "react-toastify";

const Registration = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      city: "",
      country: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, "User name should be at least 3 characters.")
        .max(30, "User name should not exceed 30 characters.")
        .required("Please enter your full name."),
      password: yup
        .string()
        .min(5, "Password should be at least 5 characters.")
        .max(15, "Password should not exceed 15 characters.")
        .required("Please enter a password."),
      email: yup.string().email("Invalid email address").required("Email is required."),
      city: yup.string().required("Please enter your city."),
      country: yup.string().required("Please enter your country."),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8000/apis/user/register", values);
        const { user, token, message } = response.data;

        toast.success(message || "User registered successfully!");
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        dispatch(loginSuccess(user));
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Registration failed. Please try again later.";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-green-800 mb-4">Registration</h1>
        
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="name" className="block text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your full name"
              className={`w-full px-4 py-2 border rounded-md mt-2 ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.name}</div>
            )}
          </div>

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

          <div>
            <label htmlFor="city" className="block text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your city"
              className={`w-full px-4 py-2 border rounded-md mt-2 ${formik.touched.city && formik.errors.city ? 'border-red-500' : 'border-gray-300'}`}
            />
            {formik.touched.city && formik.errors.city && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.city}</div>
            )}
          </div>

          <div>
            <label htmlFor="country" className="block text-gray-700">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your country"
              className={`w-full px-4 py-2 border rounded-md mt-2 ${formik.touched.country && formik.errors.country ? 'border-red-500' : 'border-gray-300'}`}
            />
            {formik.touched.country && formik.errors.country && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.country}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-green-800 text-white rounded-md hover:bg-green-700 focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
