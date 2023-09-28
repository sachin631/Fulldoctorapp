"use client"
import { hideLoading, showLoading } from "@/RTK/features/alertSlice";
import SideBar from "@/components/sideBar/SideBar";
import { Base_url } from "@/helper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Appoinmtnets = () => {
  const [appointmentData,setAppointmentData]=useState();
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.userSlice);
  console.log(user,"userSlice data at user appointment page");
  const findParticularUserAppontment = async () => {
    dispatch(showLoading());
    const res = await axios.get(
      `${Base_url}/findParticularUserAppontment`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(hideLoading());
    if(res?.data?.success){
      setAppointmentData(res?.data?.userAppontment)
    }
    console.log(res?.data,"dat of appoin")
  };
 
 

  useEffect(() => {
    findParticularUserAppontment();
  }, []);

  //deleteApoointment
  const deleteApoointment=async(_id)=>{

    try{
      dispatch(showLoading());
      const res=await axios.delete(`${Base_url}/deleteApoointment/${_id}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      console.log(res);
      if(res.data.success){
        toast.success("Appointent deleted Successfully");
        window.location.reload();
      }
    
     

    }catch(error){
      console.log(error);
    }



  }
  return (
    <>
      <div className="flex gap-2">
        <div className="">
          <SideBar className="w-" />
        </div>
        <div className="mt-16 md:ml-[19%] ml-[33%] px-3 md:text-base text-sm w-[100%] pr-2">
          <h1 className="font-bold">Appoinmtnets Lists </h1>
          {/* table start */}
          <div className="md:w-[100%] w-[270px] overflow-x-scroll">
            <table className="md:w-[100%]  mt-6">
              <tr className="">
                <th>Doc_ID</th>
                <th>Date-Time</th>
                <th>status</th>
                <th>Actions</th>
              </tr>
          {appointmentData?.map((curelem,index)=>{
            return(
              <tr className="border-solid border-[1px]"key={index}>
              <td className="text-center border-solid border-[1px]">{curelem.doctorId}</td>
              <td className="text-center border-solid border-[1px]">{curelem.date} _ {curelem.time}</td>
              <td className="text-center border-solid border-[1px]">{curelem.status}</td>
              <td> <button  onClick={()=>deleteApoointment(curelem._id)} className="px-2 py-2 rounded bg-red-500">Delete</button></td>
            </tr>

            )
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
