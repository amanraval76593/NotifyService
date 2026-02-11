import { Router } from "express";
import { emailController } from "../controller/email.controller";

const router = Router();

router.post("/email", emailController)

export default router;