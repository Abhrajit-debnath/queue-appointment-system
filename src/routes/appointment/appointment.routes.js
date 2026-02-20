import express from "express";

import authMiddleware from "../../middlewares/auth.midddleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";

import getAppointmentbyId from "../../controllers/appointment/getbyId.controller.js";
import createAppointment from "../../controllers/appointment/create.controller.js";
import getAppointmentbybusinessId from "../../controllers/appointment/getbyBusinessId.controller.js"


import {
  appointmentValidator,
  appointValidate,
} from "../../validators/appointment/appointment.validator.js";

const router = express.Router();

router.use(authMiddleware);

// Appointment Routes

router.post(
  "/create",
  authMiddleware,
  appointmentValidator,
  appointValidate,
  roleMiddleware("customer","staff"),
  createAppointment,
);

router.get("/", authMiddleware,roleMiddleware("customer"), getAppointmentbyId);

router.get(
  "/:businessId",
  authMiddleware,
  roleMiddleware("owner", "staff"),
  getAppointmentbybusinessId,
);

export default router;
