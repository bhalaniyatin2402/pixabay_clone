import * as yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../redux/services/authApi";
import { setIsLoggedIn } from "../../redux/slices/authSlice";

// form validation using yup
const loginSchema = yup.object({
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

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      actions.resetForm();

      const res = await login(values);
      if (res?.data?.success) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", res?.data?.username);
        dispatch(setIsLoggedIn([true, res?.data?.username]));
        navigate("/");
      }
      if (res.error) {
        setError(res?.error?.data?.message);
      }
    },
  });

  return (
    <section className="bg-[#ffff]">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Don't have an account??{" "}
            <span className="font-medium text-black transition-all duration-200 hover:underline">
              <Link to="/sign-up">Create account</Link>
            </span>
          </p>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-7">
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
                  className={`${
                    isLoading && "bg-black/80"
                  } inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80`}
                >
                  {isLoading && (
                    <span className="loading loading-spinner text-[#ffff] mr-3"></span>
                  )}
                  Login
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

export default Login;
