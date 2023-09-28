"use client";
import React, { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "@/RTK/features/alertSlice";
import axios from "axios";
import { Base_url } from "@/helper";

import { getUser } from "@/RTK/features/userSlice";
import Link from "next/link";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import MailIcon from "@mui/icons-material/Mail";

const NavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${Base_url}/userData`,
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        }
      );
      console.log(res.data);
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(getUser(res.data.user));
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, [user, getUserData]);

  const currentPath = usePathname();

  return (
    <>
    <div
      className={`flex justify-end items-center gap-3 px-3 py-3 absolute mr-0 w-[100%] ${
        currentPath == "/login"
          ? "hidden"
          : currentPath == "/signup"
          ? "hidden"
          : ""
      }`}
    >
      <Link href={"/notification"}>
      <div>
        <Stack spacing={2} direction="row" >
          <Badge badgeContent={user?.notification?.length} color="secondary">
            <MailIcon color="action" />
          </Badge>
        </Stack>
      </div>
      </Link>
      <Link href={"/profile"}>
       
        <div className="font-bold">{user?.name}</div>
      </Link>
      
    </div>
   
    </>
    
  );
};

export default NavBar;
