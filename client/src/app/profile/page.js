"use client";
import { hideLoading, showLoading } from "@/RTK/features/alertSlice";
import SideBar from "@/components/sideBar/SideBar";
import { Base_url } from "@/helper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// address
// :
// "8uyui"
// createdAt
// :
// "2023-09-25T08:09:49.592Z"
// email
// :
// "sangwansachin631@gmail.com"
// endTime
// :
// "01:39"
// experience
// :
// "uytyut"
// feesPerCunsaltation
// :
// 1000
// firstName
// :
// "Sachin"
// lastName
// :
// "sangwan"
// phone
// :
// "8053081201"
// specialization
// :
// "uiyiu"
// startTime
// :
// "01:39"
// status
// :
// "approved"
// updatedAt
// :
// "2023-09-25T08:10:40.829Z"
// userId
// :
// "650ddbb920cdd6e2c231834f"
// __v
// :
// 0
// _id
// :
// "6511404d20c416db3efcf779"

const page = () => {
  const [doctorData, setDoctorData] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  console.log(user, "user at profile page");
  console.log(doctorData);
  const onchange = (event) => {
    const { name, value } = event.target;
    setDoctorData({
      ...doctorData,
      [name]: value,
    });
  };
  //getDoctorDetails
  const getDoctorDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${Base_url}/getDoctorDetails`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success("data fetched");
        setDoctorData(res.data.doctor);
      } else {
        toast.error("something went wrong try again");
      }

      console.log(res.data.doctor, "response at profile of the doctor of api");
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, [user]);

  //onsubmit

  const onsubmit = async (event) => {
    event.preventDefault();
    console.log("submit");
    try {
      const {
        website,
        firstName,
        email,
        lastName,
        phone,
        address,
        specialization,
        experience,
        feesPerCunsaltation,
        startTime,
        endTime,
      } = doctorData;

      const sendDoctorData = {
        website: website,
        firstName: firstName,
        email: email,
        lastName: lastName,
        phone: phone,
        address: address,
        specialization: specialization,
        experience: experience,
        feesPerCunsaltation: feesPerCunsaltation,
        startTime: startTime,
        endTime: endTime,
        userId: user._id,
      };

      dispatch(showLoading());
      const res = await axios.put(
        `${Base_url}/updateDoctorProfile`,
        {
          ...doctorData,
          userId:user._id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success("congratulations.. form Updated successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="flex gap-2">
      <SideBar />
      <div className="mt-16 md:ml-[19%] ml-[33%] px-3 md:text-base text-sm w-[100%] pr-2 border-solid border-[1px] py-3 mr-3">
        <div>
          <div className="font-bold">Manage Profile</div>
          <div className="flex flex-col gap-4">
            <div>Personal Details :</div>
            <form className="grid md:grid-cols-3 grid-cols-1 gap-3">
              <div className="flex flex-col gap-1">
                <label>* First Name</label>
                <input
                  type="text"
                  className="border-[1px] border-solid px-3"
                  name="firstName"
                  value={doctorData?.firstName}
                  onChange={onchange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>* Last Name</label>
                <input
                  type="text"
                  className="border-[1px] border-solid px-3"
                  name="lastName"
                  value={doctorData?.lastName}
                  onChange={onchange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>* Phone No.</label>
                <input
                  type="text"
                  className="border-[1px] border-solid px-3"
                  name="phone"
                  value={doctorData?.phone}
                  onChange={onchange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>* Email</label>
                <input
                  type="text"
                  className="border-[1px] border-solid px-3"
                  name="email"
                  value={doctorData?.email}
                  onChange={onchange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Website</label>
                <input
                  type="text"
                  className="border-[1px] border-solid px-3"
                  name="website"
                  value={doctorData?.website}
                  onChange={onchange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>* Address</label>
                <input
                  type="text"
                  className="border-[1px] border-solid px-3"
                  name="address"
                  value={doctorData?.address}
                  onChange={onchange}
                />
              </div>
            </form>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <div className="font-bold"> Professional Details :</div>
            <form className="grid md:grid-cols-3 grid-cols-1 gap-3">
              <div className="flex flex-col gap-1">
                <label>* Specialization</label>
                <input
                  type="text"
                  className="border-[1px] border-solid px-3"
                  name="specialization"
                  value={doctorData?.specialization}
                  onChange={onchange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>* Experience</label>
                <input
                  type="text"
                  className="border-[1px] border-solid px-3"
                  name="experience"
                  value={doctorData?.experience}
                  onChange={onchange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>* Fees Per Cunsaltation</label>
                <input
                  type="number"
                  className="border-[1px] border-solid px-3"
                  name="feesPerCunsaltation"
                  onChange={onchange}
                  value={doctorData?.feesPerCunsaltation}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>*Start Timings </label>

                <input
                  type="time"
                  name="startTime"
                  value={doctorData?.startTime}
                  onChange={onchange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>*End Timings </label>

                <input
                  type="time"
                  name="endTime"
                  value={doctorData?.endTime}
                  onChange={onchange}
                />
              </div>
            </form>
            <button
              className="bg-blue-500 px-3 py-3 rounded text-white"
              type="submit"
              onClick={onsubmit}
            >
              update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
