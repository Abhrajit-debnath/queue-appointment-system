import express from "express";
import authMiddleware from "../../middlewares/auth.midddleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import generateQueue from "../../controllers/queue/queue.controller.js";

import getQueue from "../../controllers/queue/getqueue.controller.js";

const router = express.Router();

router.use(authMiddleware);

// Queue Routes

router.get("/:businessId/generate", authMiddleware , roleMiddleware("staff","owner"),generateQueue)
router.get("/:businessId",authMiddleware,roleMiddleware("owner","staff"),getQueue)


export default router;
