"use client";
import { hideLoading, showLoading } from "@/RTK/features/alertSlice";
import SideBar from "@/components/sideBar/SideBar";
import { Base_url } from "@/helper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//table mui data

// getAllUser //main copmponent
const Users = () => {
  const [userData, setUserData] = useState();
  console.log("userdata of the statae", userData);
  const dispatch = useDispatch();

  const getAllUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.get(`${Base_url}/getAllUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading);
      console.log(res.data, "admin ka user ki table ka data");
      if (res.data.success) {
        // toast.success("congratulations data get properly");
        setUserData(res.data.user);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading);
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);

  //deleteParticularUser
  const handleDelete=async(_id)=>{
    try{
      dispatch(showLoading());
      const res=await axios.delete(`${Base_url}/deleteParticularUser/${_id}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      console.log(res);
      if(res.data.success){
        toast.success("user deleted Successfully");
      }
      window.location.reload();
     

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
          <h1 className="font-bold">Users List for Admin</h1>
          {/* table start */}
          <div className="md:w-[100%] w-[270px] overflow-x-scroll">
            <table className="md:w-[100%]  mt-6">
              <tr className="">
                <th>Name</th>
                <th>Email</th>
                <th>doctor</th>
                <th>Actions</th>
              </tr>
              {userData?.map((curelem) => {
                return (
                  <tr key={curelem._id} className="border-solid border-[1px]">
                    <td className="text-center border-solid border-[1px]">{curelem.name}</td>
                    <td className="text-center border-solid border-[1px]">{curelem.email}</td>
                    <td className="text-center border-solid border-[1px]">
                      {curelem.isDoctor ? "yes" : "No"}
                    </td>
                    <td className="text-center border-solid border-[1px]">
                      <button className="bg-red-500 active:bg-blue-500 px-3 py-3 rounded text-white" onClick={()=>handleDelete(curelem._id)}>
                        Delete
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

export default Users;
