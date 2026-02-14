import { checkSchema, validationResult } from "express-validator";

// Validator for business route

export const businessValidator = checkSchema(
  {
    email: {
      in: ["body"],
      trim: true,
      normalizeEmail: true,
      notEmpty: {
        errorMessage: "Email is required",
        bail: true,
      },
      isEmail: {
        errorMessage: "Invalid email format",
      },
    },

    name: {
      in: ["body"],
      notEmpty: {
        errorMessage: "Ename is required",
        bail: true,
      },
    },
    startHour : {
       in: ["body"],
      notEmpty: {
        errorMessage: "startHour is required",
        bail: true,
      },
      isString:{
          errorMessage: "startHour must be in string",
      }
    },
     endHour : {
       in: ["body"],
      notEmpty: {
        errorMessage: "endHour is required",
        bail: true,
      },
      isString:{
          errorMessage: "endHour must be in string",
      }
    }
  },
  ["body"],
);

// Validation function for business route

export const businessValidate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.errors });
  }

  next();
};
