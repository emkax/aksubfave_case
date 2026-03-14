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
import { upload } from '../config/multer.config.js';

const router = express.Router();

router.get("/listNews",NewsController.listNews);
router.post("/addNews",upload.single('thumbnail'), NewsController.addNews);
router.put("/editNews/:id", upload.single('thumbnail'), NewsController.editNews);
router.delete("/deleteNews/:id",NewsController.deleteNews);
router.put("/publishNews/:judul",NewsController.publishNews);
router.get("/searchNews/:judul",NewsController.searchNews);


export default router;