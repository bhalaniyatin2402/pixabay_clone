import * as yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";

import { useSignUpMutation } from "../../redux/services/authApi";
import { Link, useNavigate } from "react-router-dom";

// form validation using yup
const signUpSchema = yup.object({
  username: yup
    .string()
    .min(3, "atleast 3 character long")
    .max(20, "name must be less than 20 char")
    .required("name is required"),
  email: yup
    .string()
    .email("invalid email address")
    .required("email is required"),
  password: yup
    .string()
    .min(6, "greater that 6 charater")
    .max(12, "less than 12 character")
    .required("password is required"),
});

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [signUp, { isLoading }] = useSignUpMutation();

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, actions) => {
      actions.resetForm();

      const res = await signUp(values);
      if (res?.data?.success) {
        navigate("/login");
      }
      if (res.error) {
        setError(res?.error?.data?.message);
      }
    },
  });

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <span className="font-medium text-black transition-all duration-200 hover:underline">
              <Link to="/login">Login</Link>
            </span>
          </p>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-7">
              <div className="mt-5 relative">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-md tracking-wider focus:outline-none focus:ring-1"
                  type="text"
                  placeholder="name"
                  id="username"
                  value={values.username}
                  onChange={handleChange}
                ></input>
                {errors.username && touched.username ? (
                  <p className="absolute text-red-900 ms-2">
                    {errors.username}
                  </p>
                ) : null}
              </div>
              <div className="mt-5 relative">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-md tracking-wider focus:outline-none focus:ring-1"
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                ></input>
                {errors.email && touched.email ? (
                  <p className="absolute text-red-900 ms-2">{errors.email}</p>
                ) : null}
              </div>
              <div className="mt-5 relative">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-md tracking-wider focus:outline-none focus:ring-1"
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                ></input>
                {errors.password && touched.password ? (
                  <p className="absolute text-red-900 ms-2">
                    {errors.password}
                  </p>
                ) : null}
              </div>
              <div className="relative">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account
                </button>
                <p className="absolute text-red-900 ms-2">{error}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
