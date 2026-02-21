import express from "express";

import {
  staffValidate,
  staffValidator,
} from "../../validators/staff/staff.validator.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import createStaff from "../../controllers/staff/create.controller.js";
import getStaffbyId from "../../controllers/staff/getId.controller.js";
import getStaffByBusinessId from "../../controllers/staff/getbusinessId.controller.js";

const router = express.Router();

router.use(authMiddleware);

// Staff Routes

router.post(
  "/create",
  authMiddleware,
  staffValidator,
  staffValidate,
  roleMiddleware("owner"),
  createStaff,
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("owner","staff"),
  getStaffbyId,
);


router.get(
  "/",
  authMiddleware,
  roleMiddleware("owner"),
  getStaffByBusinessId,
);


export default router;
