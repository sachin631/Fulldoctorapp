"use client";
import React from "react";
import { FcHome } from "react-icons/fc";
import { LiaJediOrder } from "react-icons/lia";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import HomeProtect from "../protectedRoutes/homeProtectedRoutes";
import LoginProtect from "../protectedRoutes/loginProtect";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const SideBar = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const { user } = useSelector((state) => state.userSlice);
  console.log(user, "userDataatSidebar");

  return (
    <div className="flex flex-col gap-6 pt-8 px-4 pb-8 bg-[#411111] md:w-[17%] w-[30%] h-[100vh] fixed ">
      <div className="text-white font-extrabold leading-10 text-[20px] text-center">
        DOC APP
      </div>
      <hr />
      {user?.isAdmin ? (
        <div className="flex flex-col gap-4">
          <HomeProtect>
            <Link href={"/"}>
              <div
                className={`flex gap-2 text-center items-center px-1 py-3 ${
                  currentPath == "/" ? "bg-white rounded text-black" : ""
                }`}
              >
                <div
                  className={` ${
                    currentPath == "/" ? "text-black" : "text-white"
                  }`}
                >
                  <FcHome />
                </div>
                <div
                  className={` ${
                    currentPath == "/" ? "text-black" : "text-white"
                  }`}
                >
                  Home
                </div>
              </div>
            </Link>
          </HomeProtect>

          <Link href={"/admin/doctors"}>
            <div
              className={`flex gap-2 text-center items-center px-1 py-3 ${
                currentPath == "/admin/doctors"
                  ? "bg-white rounded text-black"
                  : ""
              }`}
            >
              <div
                className={` ${
                  currentPath == "/admin/doctors" ? "text-black" : "text-white"
                }`}
              >
                <FaUserDoctor />
              </div>
              <div
                className={` ${
                  currentPath == "/admin/doctors" ? "text-black" : "text-white"
                }`}
              >
                Doctors
              </div>
            </div>
          </Link>

          <Link href={"/admin/users"}>
            <div
              className={`flex gap-2 text-center items-center px-1 py-3 ${
                currentPath == "/admin/users"
                  ? "bg-white rounded text-black"
                  : ""
              }`}
            >
              <div
                className={` ${
                  currentPath == "/admin/users" ? "text-black" : "text-white"
                }`}
              >
                <FaUserAlt />
              </div>
              <div
                className={` ${
                  currentPath == "/admin/users" ? "text-black" : "text-white"
                }`}
              >
                Users
              </div>
            </div>
          </Link>
          <Link href={"/profile"}>
            <div
              className={`flex gap-2 text-center items-center px-1 py-3 ${
                currentPath == "/profile" ? "bg-white rounded text-black" : ""
              }`}
            >
              <div
                className={` ${
                  currentPath == "/profile" ? "text-black" : "text-white"
                }`}
              >
                <FaUserAlt />
              </div>
              <div
                className={` ${
                  currentPath == "/profile" ? "text-black" : "text-white"
                }`}
              >
                Profile
              </div>
            </div>
          </Link>

          <Link href={"/login"}>
            <div
              className={`flex gap-2 text-center items-center px-1 py-3 ${
                currentPath == "/login" ? "bg-white rounded text-black" : ""
              }`}
            >
              <div className="text-white">
                <FiLogOut />
              </div>
              <div
                className="text-white"
                onClick={() => {
                  setTimeout(() => {
                    toast.success("logout Successfully try to login again");
                  }, 1000);
                  localStorage.clear();

                  router.push("/login");
                }}
              >
                LogOut
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <HomeProtect>
            <Link href={"/"}>
              <div
                className={`flex gap-2 text-center items-center px-1 py-3 ${
                  currentPath == "/" ? "bg-white rounded text-black" : ""
                }`}
              >
                <div
                  className={` ${
                    currentPath == "/" ? "text-black" : "text-white"
                  }`}
                >
                  <FcHome />
                </div>
                <div
                  className={` ${
                    currentPath == "/" ? "text-black" : "text-white"
                  }`}
                >
                  Home
                </div>
              </div>
            </Link>
          </HomeProtect>
          {user?.isDoctor ? (
            (<Link href={"/docAppoinmtnets"}>
            <div
              className={`flex gap-2 text-center items-center px-1 py-3 ${
                currentPath == "/docAppoinmtnets"
                  ? "bg-white rounded text-black"
                  : ""
              }`}
            >
              <div
                className={` ${
                  currentPath == "/docAppoinmtnets" ? "text-black" : "text-white"
                }`}
              >
                <LiaJediOrder />
              </div>

              <div
                className={` ${
                  currentPath == "/docAppoinmtnets" ? "text-black" : "text-white"
                }`}
              >
                DocApoint.
              </div>
            </div>
          </Link>)
          ) : (
            <Link href={"/appoinmtnets"}>
              <div
                className={`flex gap-2 text-center items-center px-1 py-3 ${
                  currentPath == "/appoinmtnets"
                    ? "bg-white rounded text-black"
                    : ""
                }`}
              >
                <div
                  className={` ${
                    currentPath == "/appoinmtnets" ? "text-black" : "text-white"
                  }`}
                >
                  <LiaJediOrder />
                </div>

                <div
                  className={` ${
                    currentPath == "/appoinmtnets" ? "text-black" : "text-white"
                  }`}
                >
                  Appoinmtnets
                </div>
              </div>
            </Link>
          )}

          {user?.isDoctor == false ? (
            <Link href={"/applydoctor"}>
              <div
                className={`flex gap-2 text-center items-center px-1 py-3 ${
                  currentPath == "/applydoctor"
                    ? "bg-white rounded text-black"
                    : ""
                }`}
              >
                <div
                  className={` ${
                    currentPath == "/applydoctor" ? "text-black" : "text-white"
                  }`}
                >
                  <FaUserDoctor />
                </div>
                <div
                  className={` ${
                    currentPath == "/applydoctor" ? "text-black" : "text-white"
                  }`}
                >
                  Apply Doctor
                </div>
              </div>
            </Link>
          ) : (
            ""
          )}

          <Link href={"/profile"}>
            <div
              className={`flex gap-2 text-center items-center px-1 py-3 ${
                currentPath == "/profile" ? "bg-white rounded text-black" : ""
              }`}
            >
              <div
                className={` ${
                  currentPath == "/profile" ? "text-black" : "text-white"
                }`}
              >
                <FaUserAlt />
              </div>
              <div
                className={` ${
                  currentPath == "/profile" ? "text-black" : "text-white"
                }`}
              >
                Profile
              </div>
            </div>
          </Link>

          <Link href={"/login"}>
            <div
              className={`flex gap-2 text-center items-center px-1 py-3 ${
                currentPath == "/login" ? "bg-white rounded text-black" : ""
              }`}
            >
              <div className="text-white">
                <FiLogOut />
              </div>
              <div
                className="text-white"
                onClick={() => {
                  setTimeout(() => {
                    toast.success("logout Successfully try to login again");
                  }, 1000);
                  localStorage.clear();

                  router.push("/login");
                }}
              >
                LogOut
              </div>
            </div>
          </Link>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SideBar;
