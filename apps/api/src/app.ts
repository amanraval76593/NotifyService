import express from "express";
import notificationRoute from "../src/router/notification.route"
const app = express();

app.use(express.json());

app.use("/notification", notificationRoute)

export { app }
