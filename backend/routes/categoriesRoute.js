const router = require("express").Router();
const {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  deleteCategoryCtrl,
} = require("../controllers/categoriesController");
const photoUpload = require("../middlewares/photoUpload");

const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// /api/categories
router
  .route("/")
  .post(verifyTokenAndAdmin,photoUpload.single("image"), createCategoryCtrl)
  .get(getAllCategoriesCtrl);

// /api/categories/:id
router
  .route("/:id")
  .delete(validateObjectId, verifyTokenAndAdmin, deleteCategoryCtrl);

module.exports = router;
