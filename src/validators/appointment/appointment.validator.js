import { checkSchema, validationResult } from "express-validator";

// Validator for Appointment route

export const appointmentValidator = checkSchema(
  {
    name: {
      in: ["body"],
      notEmpty: {
        errorMessage: "name is required",
        bail: true,
      },
    },

    customerId: {
      in: ["body"],
      notEmpty: {
        errorMessage: "customerId is required",
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

    time: {
      in: ["body"],
      notEmpty: {
        errorMessage: "time is required",
        bail: true,
      },
      isString: {
        errorMessage: "Time should be in String",
      },
    },
    date: {
      in: ["body"],
      notEmpty: {
        errorMessage: "date is required",
        bail: true,
      },
      isString: {
        errorMessage: "date should be in string",
      },
    },
  },
  ["body"],
);

// Validation function for Appointment route

export const appointValidate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.errors });
  }

  next();
};
