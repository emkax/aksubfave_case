import express from "express";
// import { 
//     listNews, // list jika publish true
//     // addNews, // jika belum dipublish
//     // editNews, //ifexist
//     // deleteNews, //ifexist     
//     // publishNews, // Change publish state
//     // searchNews, // Judul
//     // uploadThumbnail, // mutler
// } from "../controller/news.controller.js"

import NewsController from "../controller/news.controller.js";
import { upload } from '../middleware/multer.config.js';

import authMiddleware from "../middleware/authMiddleware.js";
import { Role } from "../generated/prisma/client/index.js";

const router = express.Router();

router.get("/listNews",NewsController.listNews);
router.post("/addNews",authMiddleware.authJWT,authMiddleware.authorize([Role.ADMIN,Role.WRITER]),upload.single('thumbnail'), NewsController.addNews);
router.put("/editNews/:id",authMiddleware.authJWT,authMiddleware.authorize([Role.ADMIN,Role.WRITER]), upload.single('thumbnail'), NewsController.editNews);
router.delete("/deleteNews/:id",authMiddleware.authJWT,authMiddleware.authorize([Role.ADMIN,Role.WRITER,Role.EDITOR]), NewsController.deleteNews);
router.put("/publishNews/:judul",authMiddleware.authJWT,authMiddleware.authorize([Role.EDITOR]),NewsController.publishNews);
router.get("/searchNews/:judul",NewsController.searchNews);


export default router;