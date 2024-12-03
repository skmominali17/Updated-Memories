"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const middleware_1 = require("../middlewares/middleware");
const router = express_1.default.Router();
router.post("/register", controller_1.register);
router.post("/login", middleware_1.isUserValid, controller_1.login);
router.get("/get/all-posts", controller_1.getPosts);
router.get("/get/post/:id", controller_1.getPostById);
router.post("/create/post", middleware_1.isAuthenticated, controller_1.createPost);
router.put("/update/post/:id", middleware_1.isAuthenticated, middleware_1.isPostOwner, controller_1.updatePost);
router.delete("/delete/post/:id", middleware_1.isAuthenticated, middleware_1.isPostOwner, controller_1.deletePost);
exports.default = router;
