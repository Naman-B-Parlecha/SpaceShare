import express from "express";

const router = express.Router();

router.get("/post", (req, res, next) => {
  console.log("inside post");
});

export default router;
