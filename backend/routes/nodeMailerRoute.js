const express = require("express");
const Route = express.Router();
const EntireController = require("../Controllers/NodeMailer");
Route.post("/mailSender", EntireController.MailSender);
module.exports = Route;
