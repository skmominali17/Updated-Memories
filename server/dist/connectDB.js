"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connectToDB() {
    mongoose_1.default.connect(process.env.CONNECTION_STRING).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    });
}
exports.default = connectToDB;
