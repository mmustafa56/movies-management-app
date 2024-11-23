import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../services/userSlice";

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
    <div className="registration-container">
      <h1 className="registration-title">Registration</h1>
      <form className="registration-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your full name"
            className={`form-input ${formik.touched.name && formik.errors.name ? "error" : ""}`}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error-message">{formik.errors.name}</div>
          )}
        </div>

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

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your city"
            className={`form-input ${formik.touched.city && formik.errors.city ? "error" : ""}`}
          />
          {formik.touched.city && formik.errors.city && (
            <div className="error-message">{formik.errors.city}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your country"
            className={`form-input ${formik.touched.country && formik.errors.country ? "error" : ""}`}
          />
          {formik.touched.country && formik.errors.country && (
            <div className="error-message">{formik.errors.country}</div>
          )}
        </div>

        

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
