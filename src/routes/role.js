import express from "express";
import Create from "../controllers/roles/create.post.js";
import List from "../controllers/roles/list.get.js";
import Detail from "../controllers/roles/detail.get.js";
import Update from "../controllers/roles/update.put.js";
import Destory from "../controllers/roles/destroy.delete.js";

const router = express.Router();

router.post("/role/new", Create);
router.get("/role/list", List);
router.get("/role/:_id", Detail);
router.put("/role/:_id", Update);
router.delete("/role/:_id", Destory);

export default router;
