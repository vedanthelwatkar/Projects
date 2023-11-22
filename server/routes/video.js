import express from "express";
import { addVideo, addView, deleteVideo, getByTags, getVideo, getVideos, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/",addVideo)

router.put("/:id",verifyToken,updateVideo)

router.delete("/:id",deleteVideo)

router.get("/find/:id",getVideo)

router.get("/user/find/:id",getVideos)

router.put("/view/:id",addView)

router.get("/tags",getByTags)

router.get("/search",search)

router.get("/random",random)

router.get("/trend",trend)

router.get("/sub",verifyToken,sub)


export default router;
