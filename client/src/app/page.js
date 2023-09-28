"use client";
// import Image from 'next/image';

import SideBar from "@/components/sideBar/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "@/helper";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [doctor, setDoctor] = useState();
  const router=useRouter();
  // const getUserData = async () => {
  //   try {
  //     const userData = await axios.post(
  //       `${Base_url}/userData`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token"), //must gave space after Beareer
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     // toast.error(error.response.data.message);
  //   }
  // };
  // useEffect(() => {
  //   getUserData();
  // }, []);

  //getAllDoctors
  const getAllDoctors = async () => {
    try {
      const res = await axios.get(
        `${Base_url}/getAllDoctors`,

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"), //must gave space after Beareer
          },
        }
      );
      if (res.data.success) {
        setDoctor(res?.data?.docotrs);
      } else {
        toast.error("something wrong data not fetched properly");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);
  console.log(doctor, "doctor doctor docotro docotr cod tor");
  return (
    <>
      <div className="flex gap-4">
        <SideBar />
        <div className="mt-16 grid gap-7 mr-3 md:grid-cols-4 grid-cols-1 md:ml-[19%] ml-[43%] md:text-base text-sm">
          {doctor?.map((curelem, index) => {
            return (
              <div className="flex flex-col  rounded  border-[1px] border-solid border-black cursor-pointer " onClick={()=>{
                router.push(`/doctordetails/${curelem._id}`)
              }}>
                <div className="bg-gray-200 rounded px-4 py-2">
                  <h1 className="font-bold text-center">
                    Doctor {curelem.firstName} {curelem.lastName}
                  </h1>
                </div>
                <div className="flex flex-col gap-3 px-4 py-3">
                  <div className="flex justify-center items-center gap-2">
                    <div className="font-bold">Specialization</div>
                    <div>{curelem.specialization}</div>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <div className="font-bold">Experience</div>
                    <div>{curelem.experience}</div>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <div className="font-bold">feesPerCunsaltation</div>
                    <div>{curelem.feesPerCunsaltation}</div>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <div className="font-bold">Timings</div>
                    <div className="flex gap-2">
                      <div>{curelem.startTime}</div>-
                      <div>{curelem.endTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
