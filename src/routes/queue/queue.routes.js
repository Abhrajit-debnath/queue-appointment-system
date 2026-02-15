import express from "express";
import authMiddleware from "../../middlewares/auth.midddleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import generateQueue from "../../controllers/queue/queue.controller.js";

import getQueue from "../../controllers/queue/getqueue.controller.js";
import statusUpdateToProgress from "../../controllers/queue/statusUpdate.controller.js";
import statusUpdateToComplete from "../../controllers/queue/statusUpdateToComplete.controller.js";

const router = express.Router();

router.use(authMiddleware);

// Queue Routes

router.get(
  "/:businessId/generate",
  authMiddleware,
  roleMiddleware("staff", "owner"),
  generateQueue,
);
router.get(
  "/:businessId",
  authMiddleware,
  roleMiddleware("owner", "staff"),
  getQueue,
);
router.patch(
  "/:appointmentId/next",
  authMiddleware,
  roleMiddleware("owner", "staff"),
  statusUpdateToProgress,
);
router.patch(
  "/:appointmentId/complete",
  authMiddleware,
  roleMiddleware("owner", "staff"),
  statusUpdateToComplete,
);

export default router;
