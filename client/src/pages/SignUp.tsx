import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signUpSchema } from "../schema/userSchema";
import ButtonSpinner from "../components/ButtonSpinner";
import {
  DriveFileRenameOutlineRoundedIcon,
  EmailRoundedIcon,
  KeyboardArrowUpRoundedIcon,
  RemoveRedEyeRoundedIcon,
  VisibilityOffRoundedIcon,
} from "../icons";
import { signUpUser } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { SignUpFormValues } from "../types/userTypes";
import { useNavigate } from "react-router-dom";

const SignUp:React.FC = () => {
  const { signUpLoading } = useSelector((state: any) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
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
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values: SignUpFormValues) => {
      const response = await dispatch<any>(signUpUser(values));
      if (response?.payload?.user) {
        navigate("/signin");
        resetForm();
      }
    },
  });

  const { name, email, password, confirm_password } = values;

  return (
    <div className="flex justify-center items-center px-6 h-screen">
      <div className="w-[30rem] p-8 bg-white shadow-xl hover:shadow-2xl rounded-md h-[36rem]">
        <h4 className="text-xl font-medium mb-4 flex items-center justify-center text-cyan-600">
          REGISTER ACCOUNT
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 h-[5rem] relative">
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-cyan-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                errors.name && touched.name
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-sm h-4">{errors.name}</p>
            )}
            <span className="absolute top-11 right-3 transform -translate-y-1/2 text-gray-500">
              <DriveFileRenameOutlineRoundedIcon
                fontSize="small"
                color="info"
              />
            </span>
          </div>
          <div className="mb-4 h-[5rem] relative">
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
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-cyan-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm h-4">{errors.email}</p>
            )}
            <span className="absolute top-11 right-3 transform -translate-y-1/2 text-gray-500">
              <EmailRoundedIcon fontSize="small" color="info" />
            </span>
          </div>
          <div className="mb-4 h-[5rem]">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                onCopy={(e) => {
                  e.preventDefault();
                  toast.error("Cannot copy from password field");
                  return false;
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Cannot paste into password field");
                  return false;
                }}
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
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
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
          <div className="mb-4 h-[5rem]">
            <label htmlFor="password" className="block mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                onCopy={(e) => {
                  e.preventDefault();
                  toast.error("Cannot copy from confirm password field");
                  return false;
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Cannot paste into confirm password field");
                  return false;
                }}
                type={showPasswordConfirm ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                value={confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-cyan-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.confirm_password && touched.confirm_password
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              <button
                type="button"
                onClick={handleTogglePasswordConfirmVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showPasswordConfirm ? (
                  <RemoveRedEyeRoundedIcon fontSize="small" color="info" />
                ) : (
                  <VisibilityOffRoundedIcon fontSize="small" color="info" />
                )}
              </button>
            </div>
            {errors.confirm_password && touched.confirm_password && (
              <p className="text-red-500 text-sm h-4">
                {errors.confirm_password}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-4 flex justify-center items-center gap-2"
          >
            {signUpLoading ? (
              <ButtonSpinner />
            ) : (
              <>
                Submit
                <KeyboardArrowUpRoundedIcon color="warning" />
              </>
            )}
          </button>
          <Link
            to={"/signin"}
            className="flex justify-end py-6 hover:underline hover:duration-200 hover:text-indigo-600"
          >
            <p>Already Have An Account ?</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
