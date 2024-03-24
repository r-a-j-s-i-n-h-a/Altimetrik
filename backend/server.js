const express = require("express");
const bodyParser = require("body-parser");
const customerRoutes = require("./routes/customerRoutes");


var cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

app.use("/api/customers", customerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
