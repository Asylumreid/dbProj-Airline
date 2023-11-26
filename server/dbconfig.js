import mysql from "mysql";
import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

//create connection

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB successfully.');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

//connect
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log("Database connected successfully!");
  }
});

export {mongoose, db};
