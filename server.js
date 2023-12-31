require("dotenv").config();

const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const dbConnect = require("./config/db");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/adminRouter");
const doctorRouter = require("./routes/docotorRouter");
const appointmentRouter = require("./routes/appointment");
const path=require("path");

//call dbconnect
dbConnect();

try {
  //middleware

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(express.json({ limit: "10mb" }));
  

  //routes

  app.use(userRouter);
  app.use(adminRouter);
  app.use(doctorRouter);
  app.use(appointmentRouter);

  // app.use(express.static(path.join(__dirname,"./client/build")))//this is use for react deployment

  //listen
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(
      `server start successfully at port ${process.env.PORT} in ${process.env.DEV_MODE} mode`
        .yellow
    );
  });
} catch (error) {
  console.log(error);
}
