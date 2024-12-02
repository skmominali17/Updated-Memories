"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const router = express_1.default.Router();
router.post("/register", controller_1.register);
router.post("/login", controller_1.login);
router.get("/", controller_1.getPosts);
router.get("/post/:id", controller_1.getPostById);
router.post("/create/post", controller_1.createPost);
router.put("/post/edit/:id", controller_1.updatePost);
router.delete("/post/delete/:id", controller_1.deletePost);
exports.default = router;
