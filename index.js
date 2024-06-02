import express from "express";
import dotenv from "dotenv"; 
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

dotenv.config({
    path:".env"
})


databaseConnection();

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
// const corsOptions = {
//     origin:'http://localhost:3000/' ,
//     credentials:true,
//     "secure": false,
//     "changeOrigin": true,
//     optionSuccessStatus:200
// }

app.use(cors(corsOptions));
const allowedOrigins = [
    'http://localhost:3000',
    'https://nimble-pony-61673b.netlify.app'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));
  
  // Your routes here
  
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });


app.use("/api/v1/user", userRoute);


app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
});