import express from "express";
import { verifyToken } from "../MiddleWare/Auth.js";
import {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
} from "../Controllers/RecipeController.js";

const router = express.Router();

router.get("/getallrecipes", getRecipes); //Get all recipes
router.get("/getrecipe/:id", getRecipe); //Get recipe by id
router.post("/addrecipe", upload.single("file"), verifyToken, addRecipe); //add recipe
router.put("/editrecipe/:id", upload.single("file"), editRecipe); //Edit recipe
router.delete("/deleterecipe/:id", deleteRecipe); //Delete recipe

export default router;
