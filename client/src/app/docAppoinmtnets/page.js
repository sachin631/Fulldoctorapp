"use client";
import { hideLoading, showLoading } from "@/RTK/features/alertSlice";
import SideBar from "@/components/sideBar/SideBar";
import { Base_url } from "@/helper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const Appoinmtnets = () => {
  const [appointmentData, setAppointmentData] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  console.log(user, "userSlice data at user appointment page");
  const findParticularUserAppontment = async () => {
    dispatch(showLoading());
    const res = await axios.get(`${Base_url}/doctorAppointmentsController`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(hideLoading());
    if (res?.data?.success) {
      setAppointmentData(res?.data?.data);
    }
    console.log(res?.data, "doctorppoin");
  };

  useEffect(() => {
    findParticularUserAppontment();
  }, []);

  //updateStatusController
  const handleApproved = async (status, appointmentsId) => {
    dispatch(showLoading());
    const res = await axios.post(
      `${Base_url}/updateStatusController`,
      { status: status, appointmentsId: appointmentsId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(hideLoading());
    console.log(res,"appointment approved or not")
  };
  return (
    <>
      <div className="flex gap-2">
        <div className="">
          <SideBar className="w-" />
        </div>
        <div className="mt-16 md:ml-[19%] ml-[33%] px-3 md:text-base text-sm w-[100%] pr-2">
          <h1 className="font-bold">Doctor Appoinmtnets Lists </h1>
          {/* table start */}
          <div className="md:w-[100%] w-[270px] overflow-x-scroll">
            <table className="md:w-[100%]  mt-6">
              <tr className="">
                <th>User_ID</th>
                <th>Date-Time</th>
                <th>status</th>
                <th>Actions</th>
              </tr>
              {appointmentData?.map((curelem, index) => {
                return (
                  <tr className="border-solid border-[1px]" key={index}>
                    <td className="text-center border-solid border-[1px]">
                      {curelem.userId}
                    </td>
                    <td className="text-center border-solid border-[1px]">
                      {curelem.date} _ {curelem.time}
                    </td>
                    <td className="text-center border-solid border-[1px]">
                      {curelem.status}
                    </td>
                    <td className="flex gap-2">
                      <button
                        className="bg-green-500 px-2 py-2 rounded text-white"
                        onClick={() => handleApproved("approved ", curelem._id)}
                      >
                        Approved
                      </button>
                      <button className="bg-red-500 px-2 py-2 rounded text-white"
                       onClick={() => handleApproved("rejected ", curelem._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
          {/* table end */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Appoinmtnets;
