import { checkSchema, validationResult } from "express-validator";

export const registerValidator = checkSchema(
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

    password: {
      in: ["body"],
      notEmpty: {
        errorMessage: "Password is required",
        bail: true,
      },
      isLength: {
        options: { min: 8 },
        errorMessage: "Password must be at least 8 characters",
      },
      matches: {
        options: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
        errorMessage: "Password must include upper, lower, number, and symbol",
      },
    },

    role: {
      in: ["body"],
      isIn: {
        options: [["customer", "staff", "owner"]],
        errorMessage: "Role must be customer, staff or owner",
      },
    },

    businessId: {
      in: ["body"],
      default: null,
      optional: true
    },
  },
  ["body"],
);

export const validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.errors });
  }

  next();
};
