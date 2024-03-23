import * as Yup from "yup";

export const BookSchema = Yup.object({
  title: Yup.string().min(2).max(100).required("please enter a title"),

  description: Yup.string().required("please enter a description"),

  image: Yup.string().required(),
});
