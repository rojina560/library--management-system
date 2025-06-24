"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book-controller");
const borrow_controller_1 = require("./app/controllers/borrow-controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// routes
app.use("/api/books", book_controller_1.bookRoutes);
app.use("/api/borrow", borrow_controller_1.borrowRoutes);
// common route
app.get("/", (req, res) => {
    res.send("Welcome To Library Management Application");
});
// not found route error handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found !",
        error: {}
    });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log("Error:", error);
        res.status(400).json({
            success: false,
            message: "Something went Wrong!",
            error,
        });
    }
});
exports.default = app;
