var session = require("express-session");
var Keycloak = require("keycloak-connect");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());

// Enable CORS support
app.use(cors());

let _keycloak;

var keycloakConfig = {
  clientId: "nodejs_apis",
  bearerOnly: true,
  serverUrl: "http://localhost:8080",
  realm: "Demain-Realm",
  credentials: {
    secret: "Itja4Ng4NCdSGX6uYkuLEMwkc4KpIbaI",
  },
};

function initKeycloak() {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!");
    return _keycloak;
  } else {
    console.log("Initializing Keycloak...");
    var memoryStore = new session.MemoryStore();
    
    app.use(session({
        secret: 'Itja4Ng4NCdSGX6uYkuLEMwkc4KpIbaI',
        resave: false,
        saveUninitialized: true,
        store: memoryStore
      }));

    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    return _keycloak;
  }
}

function getKeycloak() {
    console.log("test");
  if (!_keycloak) {
    console.error(
      "Keycloak has not been initialized. Please called init first."
    );
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};
