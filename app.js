require("dotenv").config();
const cors = require("cors");
const express = require("express");
const routes = require("./routes/index.js");
const { usersDB } = require("./database.js");
const morgan = require("morgan");
const {PORT} = process.env
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(routes);

let initialState = [
  { user: "admin", password: 4321 },
  { user: "user", password: 1234 },
];

async function StartDB() {
  initialState.forEach(e=>{
    return usersDB.push(e)
  })
  app.listen(PORT, () => {
    console.log(`Server UP on port ${PORT} ~(*-*)~`);
  });
}
StartDB();
