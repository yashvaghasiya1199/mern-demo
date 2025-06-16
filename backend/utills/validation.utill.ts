const Joi = require("joi")

const userSignUpValidation = Joi.object({
    first_name: Joi.string()
        .required()
        .messages({
            "string.base": "First name must be a string",
            "any.required": "First name is required"
        }),
    last_name: Joi.string()
        .required().
        messages({
            "string.base": "Last name must be a string",
            "any.required": "Last name is required"
        }),
    username: Joi.string().
        required()
        .messages({
            "string.base": "Username must be a string",
            "any.required": "Username is required"
        }),
    email: Joi.string().
        email()
        .required()
        .messages({
            "string.email": "Please enter a valid email",
            "any.required": "Email is required"
        }),
    password: Joi.string()
        .required()
        .messages({
            "string.base": "Password must be a string",
            "any.required": "Password is required"
        }),
    phone: Joi.number()
        .required()
        .messages({
            "number.base": "Phone number must be a number",
            "any.required": "Phone number is required"
        })
});

const driverSignupValidation = Joi.object({
    first_name: Joi.string()
        .required()
        .messages({
            "string.base": "First name must be a string",
            "any.required": "First name is required"
        }),

    last_name: Joi.string()
        .required()
        .messages({
            "string.base": "Last name must be a string",
            "any.required": "Last name is required"
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.base": "Email must be a string",
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required"
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.base": "Password must be a string",
            "string.min": "Password must be at least 6 characters",
            "any.required": "Password is required"
        }),

    username: Joi.string()
        .alphanum()
        .min(3)
        .required()
        .messages({
            "string.base": "Username must be a string",
            "string.alphanum": "Username can only contain letters and numbers",
            "string.min": "Username must be at least 3 characters long",
            "any.required": "Username is required"
        }),

    phone: Joi.number()
        .required()
        .messages({
            "string.base": "Phone number must be a string",
            "string.pattern.base": "Phone number must be a 10-digit number",
            "any.required": "Phone number is required"
        }),
        profileimage:Joi.any()

});


const findRideSchema = Joi.object({
  pickup_latitude: Joi.number()
    .min(-90)
    .max(90)
    .required()
    .messages({
      'number.base': 'Pickup latitude must be a number number and valid ',
      'number.min': 'Latitude must be at least -90',
      'number.max': 'Latitude cannot exceed 90',
      'any.required': 'Pickup latitude is required'
    }),

  pickup_longitude: Joi.number()
    .min(-180)
    .max(180)
    .required()
    .messages({
      'number.base': 'Pickup longitude must be a number and valid ',
      'number.min': 'Longitude must be at least -180',
      'number.max': 'Longitude cannot exceed 180',
      'any.required': 'Pickup longitude is required'
    })
});

const bookRide = Joi.object({
    pickup_latitude: Joi.number()
    .min(-90)
    .max(90)
    .required()
    .messages({
      'number.base': 'Pickup latitude must be a number number and valid ',
      'number.min': 'Latitude must be at least -90',
      'number.max': 'Latitude cannot exceed 90',
      'any.required': 'Pickup latitude is required'
    }),

  pickup_longitude: Joi.number()
    .min(-180)
    .max(180)
    .required()
    .messages({
      'number.base': 'Pickup longitude must be a number and valid ',
      'number.min': 'Longitude must be at least -180',
      'number.max': 'Longitude cannot exceed 180',
      'any.required': 'Pickup longitude is required'
    }),
    drop_latitude: Joi.number()
    .min(-90)
    .max(90)
    .required()
    .messages({
      'number.base': 'Pickup latitude must be a number number and valid ',
      'number.min': 'Latitude must be at least -90',
      'number.max': 'Latitude cannot exceed 90',
      'any.required': 'Pickup latitude is required'
    }),

  drop_longitude: Joi.number()
    .min(-180)
    .max(180)
    .required()
    .messages({
      'number.base': 'Pickup longitude must be a number and valid ',
      'number.min': 'Longitude must be at least -180',
      'number.max': 'Longitude cannot exceed 180',
      'any.required': 'Pickup longitude is required'
    }),
    status:Joi.string()

})

module.exports = {
    userSignUpValidation,
    driverSignupValidation,
    findRideSchema,
    bookRide
};

