import express from "express";
import { addVideo, addView, deleteVideo, getByTags, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/",verifyToken,addVideo)

router.put("/:id",verifyToken,updateVideo)

router.delete("/:id",verifyToken,deleteVideo)

router.get("/find/:id",verifyToken,getVideo)

router.put("/view/:id",verifyToken,addView)

router.get("/tags",verifyToken,getByTags)

router.get("/search",verifyToken,search)

router.get("/random",verifyToken,random)

router.get("/trend",verifyToken,trend)

router.get("/sub",verifyToken,sub)


export default router;
