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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const borrow_zod_validator_1 = require("../validators/borrow-zod.validator");
const borrow_model_1 = require("../models/borrow-model");
exports.borrowRoutes = express_1.default.Router();
// create a borrow 
exports.borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield borrow_zod_validator_1.createBorrowZodSchema.parseAsync(req.body);
        const borrow = yield borrow_model_1.Borrow.create(body);
        res.status(201).json({ success: true, message: "Book borrowed successfully", data: borrow });
    }
    catch (error) {
        if (error.message === "Book Do Not Exist!") {
            {
                res.status(404).json({ message: error.message, success: false, error: {} });
            }
        }
        else if (error.message === "Not Enough Book Copies Available!") {
            res.status(400).json({ message: error.message, success: false, error: {} });
        }
        else if (error instanceof zod_1.ZodError) {
            res.status(400).json({ message: "Validation failed", success: false, error: error });
        }
        else if (error.name === "ValidationError") {
            res.status(400).json({ message: "Validation failed", success: false, error: { name: error.name, errors: error.errors } });
        }
    }
}));
// get borrowed Books Summary
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfos",
                },
            },
            {
                $unwind: "$bookInfos",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookInfos.title",
                        isbn: "$bookInfos.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        // console.log(summary)
        res.status(200).json({ success: true, message: "Borrowed books summary retrieved successfully", data: summary });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to retrieve borrowed books summary",
            success: false,
            error: (error === null || error === void 0 ? void 0 : error.message) || error,
        });
    }
}));
