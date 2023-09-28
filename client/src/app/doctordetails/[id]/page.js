"use client";
import { hideLoading, showLoading } from "@/RTK/features/alertSlice";
import SideBar from "@/components/sideBar/SideBar";
import { Base_url } from "@/helper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = ({ params }) => {
  const [doctorData, setDoctorData] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    if (doctorData) {
      console.log(doctorData, "doctor data is now available");
    }
  }, [doctorData]); // This will run whenever doctorData changes
  const getParticularDoctorDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${Base_url}/getParticularDoctorDetails`,
        { _id: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(
        res,
        "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"
      );
      dispatch(hideLoading());

      if (res?.data?.success) {
        toast.success("loaded successfullyy");
        setDoctorData(res?.data?.doctor);
      } else {
        toast.success("something went wrong try again");
      }
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getParticularDoctorDetails();
  }, []);

  //bookNowHandle
  const bookNowHandle = async (event) => {
    try {
      event.preventDefault();
      dispatch(showLoading());
      const res = await axios.post(
        `${Base_url}/booking`,
        {
          userId: user._id,
          userInfo: user,
          doctorId: params.id,
          doctorInfo: doctorData,
          time: time,
          date: date,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if(res.data.success){
        toast.success("request submited successfully");
      }else{
        toast.error("please try again")
      }
      console.log(res, "book now button");
    } catch (error) {
      toast.error(error.response.data.error)
      console.log(error)
    }
  };
  return (
    <>
      <div className="flex gap-2">
        <SideBar />
        <div className="mt-16 md:ml-[19%] ml-[43%] px-3 md:text-base text-sm w-[100%] pr-2 border-solid border-[1px] py-3 mr-8">
          <div className="font-bold text-center">Booking Page</div>
          <div>
            <div>
              <span className="font-bold"> FirstName </span>{" "}
              {doctorData?.firstName}
            </div>
            <div>
              <span className="font-bold"> LastName </span>{" "}
              {doctorData?.lastName}
            </div>
            <div>
              <span className="font-bold"> Email </span> {doctorData?.email}
            </div>
            <div>
              <span className="font-bold"> Address </span> {doctorData?.address}
            </div>
            <div>
              <span className="font-bold"> Profile createdAt </span>{" "}
              {doctorData?.createdAt}
            </div>
            <div>
              <span className="font-bold"> Open Time </span>{" "}
              {doctorData?.startTime}
            </div>
            <div>
              <span className="font-bold"> close Time </span>{" "}
              {doctorData?.endTime}
            </div>
            <div>
              <span className="font-bold"> Experience </span>{" "}
              {doctorData?.experience}
            </div>
            <div>
              <span className="font-bold"> Fees Per Cunsaltation </span>{" "}
              {doctorData?.feesPerCunsaltation}
            </div>
            <div>
              <span className="font-bold"> Phone </span> {doctorData?.phone}
            </div>
            <div>
              <span className="font-bold"> specialization </span>{" "}
              {doctorData?.specialization}
            </div>
            <div>
              <span className="font-bold"> Last profile Update At : </span>
              {doctorData?.updatedAt}
            </div>
            <div>
              <span className="font-bold"> website : </span>
              {doctorData?.website}
            </div>
            <form className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 max-w-[150px] mt-3">
                <label For="date" className="font-bold">
                  Select Date
                </label>
                <input
                  type="date"
                  id="date"
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-1 max-w-[150px] mt-3">
                  <label For="startTime" className="font-bold">
                    Select Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    onChange={(event) => {
                      setTime(event.target.value);
                    }}
                  />
                </div>
              </div>
              {/* <button className="text-center bg-blue-500 text-white rounded px-3 py-3">
                Check Availability
              </button> */}
              <button
                className="text-center bg-blue-500 text-white rounded px-3 py-3"
                onClick={bookNowHandle}
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
