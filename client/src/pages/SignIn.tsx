import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import ButtonSpinner from "../components/ButtonSpinner";
import { signInSchema } from "../schema/userSchema";
import {
  EmailRoundedIcon,
  KeyboardArrowUpRoundedIcon,
  RemoveRedEyeRoundedIcon,
  VisibilityOffRoundedIcon,
} from "../icons";
import { signInUser } from "../services/userService";
import { SignInFormValues } from "../types/userTypes";
import { useDispatch, useSelector } from "react-redux";

const SignIn:React.FC = () => {
  const { signInLoading } = useSelector((state: any) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values: SignInFormValues) => {
      const response = await dispatch<any>(signInUser(values));
      if (response?.payload?.user) {
        navigate("/");
        resetForm();
      }
    },
  });

  const { email, password } = values;

  return (
    <div className="flex justify-center items-center h-screen px-6">
      <div className="w-[30rem] p-8 bg-white shadow-xl hover:shadow-2xl rounded-md h-[26rem]">
        <h4 className="text-xl font-medium mb-8 flex items-center justify-center text-cyan-600">
          WELCOME BACK
        </h4>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="mb-4 h-[4rem] relative">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-cyan-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
            />
            <span className="absolute top-11 right-3 transform -translate-y-1/2">
              <EmailRoundedIcon fontSize="small" color="info" />
            </span>
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm h-4">{errors.email}</p>
            )}
          </div>
          <div className="mb-4 h-[4rem]">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-cyan-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              <button
                type="button"
                onClick={handleTogglePasswordVisibility}
                className="absolute top-4 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <RemoveRedEyeRoundedIcon fontSize="small" color="info" />
                ) : (
                  <VisibilityOffRoundedIcon fontSize="small" color="info" />
                )}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm h-4">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-7 flex justify-center items-center gap-2"
          >
            {signInLoading ? (
              <ButtonSpinner />
            ) : (
              <>
                Submit
                <KeyboardArrowUpRoundedIcon color="warning" />
              </>
            )}
          </button>
          <Link
            to={"/signup"}
            className="flex justify-end py-5 hover:underline hover:duration-200 hover:text-indigo-600"
          >
            <p>Don't Have An Account ?</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
