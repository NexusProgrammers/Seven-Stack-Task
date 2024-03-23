import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/userService";
import {
  AddRoundedIcon,
  ExitToAppRoundedIcon,
  HomeRoundedIcon,
  HowToRegRoundedIcon,
} from "../icons";
import BookModal from "./BookModal";

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

const Header: React.FC = () => {
  const { user } = useSelector((state: any) => state.user);
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/signin");
  };

  useEffect(() => {
    {
      token && dispatch<any>(getUserProfile());
    }
  }, [dispatch]);

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link
                        to={"/signup"}
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {!token && (
                          <p className="flex items-center gap-1">
                            <span>Sign Up</span>
                            <span>
                              <HowToRegRoundedIcon />
                            </span>
                          </p>
                        )}
                      </Link>
                      <Link
                        to={"/signin"}
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {!token && (
                          <p className="flex items-center gap-1">
                            <span>Sign In</span>
                            <span>
                              <ExitToAppRoundedIcon />
                            </span>
                          </p>
                        )}
                      </Link>
                      {token && (
                        <Link
                          to={"/"}
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          <p className="flex items-center gap-1">
                            <span>
                              <HomeRoundedIcon />
                            </span>
                            <span>Home</span>
                          </p>
                        </Link>
                      )}
                      {token && (
                        <button
                          onClick={() => setShowAddBookModal(true)}
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          <p className="flex items-center gap-1">
                            <span>
                              <AddRoundedIcon />
                            </span>
                            <span>Add Book</span>
                          </p>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {token && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          {user && (
                            <img
                              className="h-12 w-12 rounded-full object-cover"
                              src={user.image}
                              alt=""
                            />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }: { active: boolean }) => (
                              <Link
                                to={"/profile"}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                )}
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }: { active: boolean }) => (
                              <a
                                onClick={handleLogout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Disclosure.Button
                  className={"w-full flex items-start justify-start flex-col"}
                >
                  <Link
                    to={"/signup"}
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white w-full flex items-start",
                      "block rounded-md px-3 py-2 text-base font-medium w-full"
                    )}
                  >
                    {!token && (
                      <p className="flex items-center gap-1">
                        <span>Sign Up</span>
                        <span>
                          <HowToRegRoundedIcon />
                        </span>
                      </p>
                    )}
                  </Link>
                  <Link
                    to={"/signin"}
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white w-full flex items-start",
                      "block rounded-md px-3 py-2 text-base font-medium w-full"
                    )}
                  >
                    {!token && (
                      <p className="flex items-center gap-1">
                        <span>Sign In</span>
                        <span>
                          <ExitToAppRoundedIcon />
                        </span>
                      </p>
                    )}
                  </Link>
                </Disclosure.Button>
                {token && (
                  <Link
                    to={"/"}
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white w-full flex items-start",
                      "rounded-md px-3 py-2 text-sm font-medium w-full"
                    )}
                  >
                    <p className="flex items-center gap-1">
                      <span>
                        <HomeRoundedIcon />
                      </span>
                      <span>Home</span>
                    </p>
                  </Link>
                )}
                {token && (
                  <button
                    onClick={() => setShowAddBookModal(true)}
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white w-full flex items-start",
                      "rounded-md px-3 py-2 text-sm font-medium w-full"
                    )}
                  >
                    <p className="flex items-center gap-1">
                      <span>
                        <AddRoundedIcon />
                      </span>
                      <span>Add Book</span>
                    </p>
                  </button>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <BookModal
        isOpen={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
      />
    </>
  );
};

export default Header;
