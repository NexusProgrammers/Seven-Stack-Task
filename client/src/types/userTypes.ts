export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface SignUpResponse {
  message: string;
  token: string;
  user: {
    name: string;
    email: string;
    image: string;
    books: any[];
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UserState {
  user: {
    name: string;
    email: string;
    image: string;
    books: any[];
    _id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  token: string | null;
  signUpLoading: boolean | false;
  signUpError: string | null;
  signInLoading: boolean | false;
  signInError: string | null;
  getProfileLoading: boolean | false;
  getProfileError: string | null;
  updateProfileLoading: boolean | false;
  updateProfileError: string | null;
  updatePasswordLoading: boolean | false;
  updatePasswordError: string | null;
}

export interface CustomError extends Error {
  response?: {
    data?: {
      message: string;
    };
  };
}

export interface SignInFormValues {
  email: string;
  password: string;
}

export interface SignInResponse {
  message: string;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
    books: string[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface GetProfileResponse {
  _id: string;
  name: string;
  email: string;
  image: string;
  books: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileResponse {
  message: string;
  user: {
    name: string;
    email: string;
    image: string;
    books: any[];
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UpdateProfileFormValues {
  name: string;
  email: string;
  image: string;
}

export interface UpdatePasswordFormValues {
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export interface UpdatePasswordResponse {
  message?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  user?: {
    name: string;
    email: string;
    image: string;
    books: any[];
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}
