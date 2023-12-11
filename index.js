const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/config");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors());

const { notfound } = require("./middlewares/notfound.middleware");
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const ratingRouter = require("./routes/rating.routes");
const userRouter = require("./routes/user.routes");
const getaccount = require("./routes/get-account.routes");
const movies = require("./routes/movies.routes");

app.use("/", userRouter);
app.use("/", ratingRouter);
app.use("/", getaccount);
app.use("/", movies);

app.use(notfound);
app.use(errorHandler);

app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}/`);
});
