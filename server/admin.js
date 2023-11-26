import { mongoose, db } from "./dbconfig.js";
import express from "express";
import multer from "multer";
import fs from 'fs';
import csvParser from 'csv-parser';
const upload = multer({ dest: 'uploads/' });


var router = express.Router();
//to get flight details in UTC time
router.get("/flights", (req, res) => {
  const sqlGet =
    "select s.flight_id, s.airplane_id, s.origin, s.destination, DATE_FORMAT(s.departure_time , '%Y-%m-%d %k:%i:%s') as departure_time, DATE_FORMAT(s.arrival_time , '%Y-%m-%d %k:%i:%s') as arrival_time, s.economy_fare, s.business_fare, s.platinum_fare, s.status from schedule s order by s.flight_id";
  db.query(sqlGet, (err, result) => {
    if (err) res.send({ err: err });
    else res.send(result);
  });
});

//to update flight status
router.put("/flightStatus/update/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sqlUpdate = "update flights set flightstatus_id=? where flight_id=?";
  db.query(sqlUpdate, [status, id], (err, result) => {
    if (err) res.send({ err: err });
    else res.send(result);
  });
});

//to update departure time
router.put("/departureTime/update/:id", (req, res) => {
  const { id } = req.params;
  const { departure_time } = req.body;
  const sqlUpdate = "update flights set departure_time=? where flight_id=?";
  db.query(sqlUpdate, [departure_time, id], (err, result) => {
    if (err) res.send("0");
    else res.send("1");
  });
});

router.post("/uploadFlightsCSV", upload.single('file'), (req, res) => {
  const flightsData = [];
  const { file } = req;
  const { filename } = file;

  // Use csv-parser to parse the CSV file
  fs.createReadStream(file.path)
    .pipe(csvParser())
    .on('data', (row) => {
      flightsData.push(row);
    })
    .on('end', () => {
      if (flightsData.length === 0) {
        return res.status(400).json({ success: false, message: 'No data found in the CSV file.' });
      }

      const sqlInsert = "INSERT INTO flights (flight_id, airplane_id, route_id, flightstatus_id, departure_time, arrival_time, flight_no, economy_fare, business_fare, platinum_fare) VALUES ?";
      const values = flightsData.map((flight) => [
        flight.flight_id,
        flight.airplane_id,
        flight.route_id,
        flight.flightstatus_id,
        flight.departure_time,
        flight.arrival_time,
        flight.flight_no,
        flight.economy_fare,
        flight.business_fare,
        flight.platinum_fare,
      ]);

      console.log('Testing SQL Query:', sqlInsert, [values]);

      db.query(sqlInsert, [values], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ success: false, message: 'Internal server error.' });
        } else {
          res.status(200).json({ success: true, message: 'File uploaded and data inserted successfully.' });
        }
      });
    });
});

//to update arrival time
router.put("/arrivalTime/update/:id", (req, res) => {
  const { id } = req.params;
  const { arrival_time } = req.body;
  const sqlUpdate = "update flights set arrival_time=? where flight_id=?";
  db.query(sqlUpdate, [arrival_time, id], (err, result) => {
    if (err) res.send("0");
    else res.send("1");
  });
});
export default router;
