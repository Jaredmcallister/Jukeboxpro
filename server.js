require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;

app.use(require("morgan")("dev"));
app.use(express.json());

app.use(require("./api/auth").router);
app.use("/playlists", require("./api/playlists"));
app.use("/tracks", require("./api/tracks"));

app.use((req, res, next) => {
  next({ status: 404, message: "endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.send(err.message ?? "Sorry, something broke : (");
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});