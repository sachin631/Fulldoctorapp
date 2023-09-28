"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Base_url } from "@/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { hideLoading, showLoading } from "@/RTK/features/alertSlice";
import Loader from "@/components/loader/Loader";
import LoginProtect from "@/components/protectedRoutes/loginProtect";

const login = () => {
  const [form, setform] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertSlice);
  const onchange = (event) => {
    const { value, name } = event.target;
    setform({
      ...form,
      [name]: value,
    });
  };
  console.log(form, "form is ");
  const submitButton = async (event) => {
    event.preventDefault();

    try {
      const { email, passWord } = form;
      console.log(email, passWord);
      // const data=new FormData();
      // data.append("email",email);
      // data.append("passWord",passWord);
      // console.log(data,"data")
      const requestData = {
        email: email,
        passWord: passWord,
      };
      dispatch(showLoading());
      let res = await axios.post(`${Base_url}/loginUser`, requestData);
      window.location.reload();
      dispatch(hideLoading());
      console.log("res1", res.data);
      if (res.status === 200 && res.data.success) {
        localStorage.setItem("token", res.data.token);
        toast.success("login Successfully!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
toast.error("try again")
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <LoginProtect>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={onchange}
                    name="email"
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      {/* Forgot password? */}
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    onChange={onchange}
                    name="passWord"
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={submitButton}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <Link href="signup" className="text-blue-500 font-bold">
                SignUp
              </Link>
            </p>
            <ToastContainer />
          </div>
        </div>
      </LoginProtect>
    </>
  );
};

export default login;
