import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "@mui/material";
import {
  DriveFileRenameOutlineRoundedIcon,
  EmailRoundedIcon,
  ImageRoundedIcon,
  KeyboardArrowUpRoundedIcon,
  UpdateRoundedIcon,
} from "../icons";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { getUserProfile, updateProfile } from "../services/userService";
import ButtonSpinner from "../components/ButtonSpinner";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, updateProfileLoading } = useSelector(
    (state: any) => state.user
  );
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    dispatch<any>(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const { name, email, image } = user;
      setFormData({
        name,
        email,
        image,
      });
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setFormData((prevState) => ({
          ...prevState,
          image: imageUrl,
        }));
      };
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await dispatch<any>(updateProfile(formData));
    if (response?.payload?.user) {
      navigate("/");
    }
  };
  return (
    <div className="flex items-center justify-center px-6 h-screen mt-6 mb-6 ml-4">
      <form
        className="w-[33rem] p-8 bg-white shadow-md hover:shadow-xl rounded-md h-[40rem]"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center mb-4">
          <Avatar
            src={
              typeof formData.image === "string" ? formData.image : undefined
            }
            alt="Profile Img"
            sx={{ width: "180px", height: "180px" }}
          />
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-semibold text-gray-800"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            value={formData.name}
            onChange={handleChange}
          />
          <span className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500">
            <DriveFileRenameOutlineRoundedIcon className="w-6 h-6" />
          </span>
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-semibold text-gray-800"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            value={formData.email}
            onChange={handleChange}
          />
          <span className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500">
            <EmailRoundedIcon className="w-5 h-5 mt-1" />
          </span>
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-semibold text-gray-800"
          >
            Image
          </label>
          <input
            id="image"
            type="file"
            name="image"
            className="w-full py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:border-black cursor-pointer"
            onChange={handleImageChange}
          />
          <span className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500">
            <ImageRoundedIcon className="w-5 h-5 mt-2" />
          </span>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-4 flex justify-center items-center gap-2"
            disabled={updateProfileLoading}
          >
            {updateProfileLoading ? (
              <ButtonSpinner />
            ) : (
              <>
                Update <KeyboardArrowUpRoundedIcon />
              </>
            )}
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="border-b w-1/5 md:w-1/4"></span>
          <a className="text-xs text-gray-500">OR</a>
          <span className="border-b w-1/5 md:w-1/4"></span>
        </div>
        <div className="flex justify-center gap-4 py-4">
          <Button
            size="small"
            variant="contained"
            color="info"
            sx={{ textTransform: "none" }}
            endIcon={<UpdateRoundedIcon fontSize="small" />}
            onClick={() => setChangePasswordModal(true)}
          >
            Change Password
          </Button>
        </div>
      </form>
      <ChangePasswordModal
        isOpen={changePasswordModal}
        onClose={() => setChangePasswordModal(false)}
      />
    </div>
  );
};

export default Profile;
