"use client";
import { hideLoading, showLoading } from "@/RTK/features/alertSlice";
import SideBar from "@/components/sideBar/SideBar";
import { Base_url } from "@/helper";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { TimePicker, Form } from "antd";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { toast } from "react-toastify";
// import 'react-clock/dist/Clock.css';

const page = () => {
  const [form, setform] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const onchange = (event) => {
    const { value, name } = event.target;
    setform({
      ...form,
      [name]: value,
    });
  };

  console.log(form, "doctordata apply doctor page");
  //onsubmit button
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
      } = form;

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
      const res = await axios.post(`${Base_url}/doctorData`, sendDoctorData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success("congratulations.. form submitted successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="flex gap-2">
      <SideBar />
      <div className="mt-16 md:ml-[19%] ml-[43%] px-3 md:text-base text-sm w-[100%] pr-2">
        <h1 className="text-center font-bold">Apply Doctor</h1>
        <div className="flex flex-col gap-4">
          <div>Personal Details :</div>
          <form className="grid md:grid-cols-3 grid-cols-1 gap-3">
            <div className="flex flex-col gap-1">
              <label>* First Name</label>
              <input
                type="text"
                className="border-[1px] border-solid px-3"
                name="firstName"
                onChange={onchange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>* Last Name</label>
              <input
                type="text"
                className="border-[1px] border-solid px-3"
                name="lastName"
                onChange={onchange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>* Phone No.</label>
              <input
                type="text"
                className="border-[1px] border-solid px-3"
                name="phone"
                onChange={onchange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>* Email</label>
              <input
                type="text"
                className="border-[1px] border-solid px-3"
                name="email"
                onChange={onchange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Website</label>
              <input
                type="text"
                className="border-[1px] border-solid px-3"
                name="website"
                onChange={onchange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>* Address</label>
              <input
                type="text"
                className="border-[1px] border-solid px-3"
                name="address"
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
                onChange={onchange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>* Experience</label>
              <input
                type="text"
                className="border-[1px] border-solid px-3"
                name="experience"
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
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>*Start Timings </label>

              <input type="time" name="startTime" onChange={onchange} />
            </div>
            <div className="flex flex-col gap-1">
              <label>*End Timings </label>

              <input type="time" name="endTime" onChange={onchange} />
            </div>
          </form>
          <button
            className="bg-blue-500 px-3 py-3 rounded"
            type="submit"
            onClick={onsubmit}
          >
            {" "}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
