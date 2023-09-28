"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { Base_url } from "@/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "@/RTK/features/alertSlice";
import Loader from "@/components/loader/Loader";

const signup = () => {
  const {loading} =useSelector((state)=>state.alertSlice);
  const [formData, setFormData] = useState();
  const router = useRouter();
  const dispatch=useDispatch();
  const onchange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log("formdata", formData);
  const onsubmit = async (event) => {
    event.preventDefault();
    
    try {
      dispatch(showLoading());
      const res = await axios.post(`${Base_url}/registerUser`, formData);
      dispatch(hideLoading());
      // console.log("res1",res.response.data)
      if (res.status === 200 && res.data.success) {
        toast.success("Register Successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      dispatch(hideLoading());
      toast.error(error.response?.data?.message)
    }
  };
  if(loading){
    return <div className='h-[100vh] flex justify-center items-center bg-black'><Loader/></div>
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            {/* name field start */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  onChange={onchange}
                  name="name"
                  id="text"
                  type="text"
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="passWord"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  PassWord
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={onchange}
                  name="passWord"
                  id="passWord"
                  type="password"
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={onsubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member ?{" "}
            <Link href="/login" className="text-blue-500 font-bold">
              Login
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default signup;
