var ttn = require("ttn");
var appID = "sensorultra";
const express = require("express");
var accessKey = "ttn-account-v2.g7M2c9s1lvj-ySg3cAc-CmAJw0thqRSFxrjFd3k7AVY";
ttn
  .data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID);
      const dataReceived = payload;
      console.log(payload);
    });
  })
  .catch(function (error) {
    console.error("Error", error);
    process.exit(1);
  });

const app = express();
app.listen(8000, () => {
  console.log("Server started!");
});
app.route("/api/data").get((req, res) => {
  res.send({
    data: { data: dataReceived },
  });
});
