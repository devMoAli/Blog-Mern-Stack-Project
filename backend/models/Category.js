const mongoose = require("mongoose");
const Joi = require("joi");

// Category Schema
const CategorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Category Model
const Category = mongoose.model("Category", CategorySchema);

// Validate Create Category
function validateCreateCategory(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200).required(),
    description: Joi.string().trim().min(2).required(),
  });
  return schema.validate(obj);
}

module.exports = {
  Category,
  validateCreateCategory,
};
