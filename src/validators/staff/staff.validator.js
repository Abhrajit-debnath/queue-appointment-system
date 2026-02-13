import { checkSchema, validationResult } from "express-validator";

// Validator for staff route

export const staffValidator = checkSchema(
  {
    name: {
      in: ["body"],
      notEmpty: {
        errorMessage: "name is required",
        bail: true,
      },
    },
    businessId: {
      in: ["body"],
      notEmpty: {
        errorMessage: "BusinessId is required",
        bail: true,
      },
      isMongoId: {
        errorMessage: "Invalid Type",
      },
    },
  },
  ["body"],
);

// Validation function for staff route

export const staffValidate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.errors });
  }

  next();
};
