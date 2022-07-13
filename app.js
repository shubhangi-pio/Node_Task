const express = require("express");

const app = express();
app.use(express.json());

const keycloak1 = require("./config/keycloak-config.js").initKeycloak();
app.use(keycloak1.middleware());

var testController = require("./controller/test-controller.js");
app.use("/test", testController);

app.listen(5000, () => {
  console.log(" running port 5000");
});
