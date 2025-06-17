const express = require("express");
const Route = express.Router();
const EntireController = require("../controllers/nodeMailerController");
Route.post("/mailSender", EntireController.MailSender);
module.exports = Route;
