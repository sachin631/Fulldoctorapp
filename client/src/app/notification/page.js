"use client";
import SideBar from "@/components/sideBar/SideBar";
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "@/RTK/features/alertSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { Base_url } from "@/helper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//mui component main compo is below
function CustomTabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//main component
const Notification = () => {
  const dispatch=useDispatch();

  const [value, setValue] = React.useState(0);
  const {user}=useSelector((state)=>state.userSlice);
  console.log("user at read message admin",user?.notification)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleAllReadButton=async()=>{
    try{
      dispatch(showLoading());
        const res=await axios.post(`${Base_url}/readAllMessages`,{_id:user._id},{
            headers:{
                Authorization:`Berear ${localStorage.getItem("token")}`
            }
        });
       dispatch(hideLoading());
        if(res?.data?.success){
            toast.success("Marked as Read Successfully");
            window.location.reload();
        }else{
            toast.error(res.data.message);
        }
    }catch(error){
      dispatch(hideLoading());
        toast.error(error?.response?.data?.message)
        console.log(error);

    }
  };

  //deleteAllMessages
  const deleteAllMessages=async()=>{

    try{
        showLoading();
        const res=await axios.post(`${Base_url}/deleteAllMessages`,{_id:user._id},{
            headers:{
                Authorization:`Berear ${localStorage.getItem("token")}`
            }
        });
        hideLoading();
        if(res?.data?.success){
            toast.success("delete All Messages Successfully");
            window.location.reload();
        }else{
            toast.error(res.data.message);
        }
    }catch(error){
        hideLoading();
        toast.error(error?.response?.data?.message)
        console.log(error);

    }

  }
  return (
    <>
      <div className="flex gap-2">
        <div>
          <SideBar />
        </div>
        <div className="mt-16 md:ml-[19%] ml-[43%] px-3 md:text-base text-sm w-[100%] pr-2">
          <h1 className="text-center font-bold">Notification Page</h1>
          <div className="">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  textColor="secondary"
                >
                  <Tab label="unRead" {...a11yProps(0)} />
                  <Tab label="Read" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className="flex md:flex-row flex-col justify-between md:gap-4 gap-3">
                  <div className="flex flex-col gap-3">
                    {user?.notification?.map((curelem)=>{
                        return(
                            <div className="px-3 py-3 bg-green-500 text-white rounded">{curelem.message}</div>

                        )
                    })}
                   

                  </div>
                  <div>
                    <button className="px-3 py-3 bg-red-500 rounded text-white" onClick={handleAllReadButton}>Mark messages as read</button>
                  </div>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
              <div className="flex md:flex-row flex-col justify-between md:gap-4 gap-3">
                  <div className="flex flex-col gap-3">
                    {user?.seenNotification?.map((curelem)=>{
                        return(
                            <div className="px-3 py-3 bg-green-500 text-white rounded">{curelem.message}</div>

                        )
                    })}
                   

                  </div>
                  <div>
                    <button className="px-3 py-3 bg-red-500 rounded text-white" onClick={deleteAllMessages}>Delete All Messages</button>
                  </div>
                </div>
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
