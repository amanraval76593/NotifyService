import { Router } from "express";
import { initializeNotificationController } from "../controller/notify.controller";
import { validate } from "../middleware/validate.middleware";
import { initializeNotificationSchema } from "../types/validate_notify.types";

const router = Router();

router.post("/notify",validate(initializeNotificationSchema), initializeNotificationController)

export default router;