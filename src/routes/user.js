import express from "express";
import Register from "../controllers/users/register.post.js";
import List from "../controllers/users/list.get.js";
import Detail from "../controllers/users/detail.get.js";
import Restore from "../controllers/users/restore.patch.js";
import Soft from "../controllers/users/soft.delete.js";
import Destory from "../controllers/users/destroy.delete.js";

const router = express.Router();

router.post("/user/register", Register);
router.get("/user/list", List);
router.get("/user/:_id", Detail);
router.patch("/user/restore/:_id", Restore);
router.delete("/user/remove/:_id", Soft);
router.delete("/user/:_id", Destory);

export default router;
