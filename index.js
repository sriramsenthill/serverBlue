const express = require("express");
const connectToDatabase = require("./db");
const routes = require("./routes");
const cors = require("cors");

const app = express();
app.use(cors());

const port = 3001;

app.use(express.json());

connectToDatabase();

app.use("/", routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});