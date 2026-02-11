import express from "express";

import {
  businessValidate,
  businessValidator,
} from "../../validators/business/business.validator.js";
import createbusiness from "../../controllers/business/create.controller.js";
import authMiddleware from "../../middlewares/auth.midddleware.js";
import getbusinesses from "../../controllers/business/get.controller.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import getallBusinesses from "../../controllers/business/getall.controller.js";
import getBusinessById from "../../controllers/business/getId.controller.js";

const router = express.Router();

router.use(authMiddleware);

// Business Routes
router.get("/", roleMiddleware("owner", "customer"), getallBusinesses);

router.post(
  "/create",
  businessValidator,
  businessValidate,
  roleMiddleware("owner"),
  createbusiness,
);

router.get("/businesses", roleMiddleware("owner"), getbusinesses);

router.get("/:id", roleMiddleware("owner", "staff"), getBusinessById);

export default router;
