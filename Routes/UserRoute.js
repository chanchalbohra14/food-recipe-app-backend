import express from "express";
import {
  getUser,
  userLogin,
  userSignUp,
} from "../Controllers/USerController.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/user/:id", getUser);

export default router;
