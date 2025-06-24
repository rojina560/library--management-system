"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_zod_validator_1 = require("../validators/book-zod-validator");
const book_model_1 = require("../models/book-model");
exports.bookRoutes = express_1.default.Router();
// create a book 
exports.bookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield book_zod_validator_1.createBookZodSchema.parseAsync(req.body);
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error.name === "ValidationError" ? { name: error.name, errors: error.errors } : error
        });
    }
}));
// get all books 
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query;
        const query = filter ? { genre: filter } : {};
        const books = yield book_model_1.Book.find(query).sort({ [sortBy]: sort === "asc" ? 1 : -1 }).limit(parseInt(limit));
        // const books = await Book.find()
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Invalid Query Error",
            success: false,
            error: error,
        });
    }
}));
// get single book 
exports.bookRoutes.get("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const existingBook = yield book_model_1.Book.isBookExists(bookId);
        if (existingBook) {
            const book = yield book_model_1.Book.findById(bookId);
            res.status(200).json({
                success: true,
                message: "Book retrieved successfully",
                data: book,
            });
        }
        else {
            res.status(404).json({
                message: "Book Does Not Exists",
                success: false,
                data: {},
            });
        }
    }
    catch (error) {
        // console.log(error)
        next(error);
    }
}));
// update a book
exports.bookRoutes.put("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedBookParameters = yield book_zod_validator_1.updateBookZodSchema.parseAsync(req.body);
        const existingBook = yield book_model_1.Book.isBookExists(bookId);
        if (existingBook) {
            const updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, updatedBookParameters, { new: true, runValidators: true });
            res.status(200).json({
                success: true,
                message: "Book Updated successfully",
                data: updatedBook,
            });
        }
        else {
            res.status(404).json({
                message: "Book Does Not Exists",
                success: false,
                data: {},
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error.name === "ValidationError" ? { name: error.name, errors: error.errors } : error
        });
    }
}));
// delete a book 
exports.bookRoutes.delete("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const existingBook = yield book_model_1.Book.isBookExists(bookId);
        if (existingBook) {
            yield book_model_1.Book.findByIdAndDelete(bookId);
            res.status(200).json({
                success: true,
                message: "Book deleted successfully",
                data: null,
            });
        }
        else {
            res.status(404).json({
                message: "Book Does Not Exists",
                success: false,
                data: {},
            });
        }
    }
    catch (error) {
        next(error);
    }
}));
