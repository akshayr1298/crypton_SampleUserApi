import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminroutes.js'

dotenv.config();
const app = express();

// mongodb connection
mongoose.connect("mongodb://localhost:27017/crudApp").then((data, err) => {
  err
    ? console.log("database is not connected", err)
    : console.log("database connected");
});
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/',(req,res)=>{
  console.log('server is running');
})
app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)



// error handling
app.use((req, res, next) => {
  const error = new Error("NOT FOUND");
  error.status = 404;
  next(error);
});
app.use((error, req, res) => {
  res.status(err.status || 500).json({ error: { message: error.message } });
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`server started on port number ${PORT}`);
});
