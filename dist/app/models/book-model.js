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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: { type: String, required: [true, "Author is required"], trim: true },
    genre: {
        type: String,
        required: [true, "Genre Is Required"],
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "{VALUE} is not a valid genre",
        },
    },
    isbn: { type: String, required: [true, "isbn Is Required"], unique: true, trim: true },
    description: { type: String, default: "" },
    copies: {
        type: Number,
        required: [true, "Copies Area Required"],
        min: [0, "Copies must be a positive number"],
        trim: true,
    },
    available: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true,
});
// static method for checking book existence 
bookSchema.static("isBookExists", function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield exports.Book.findById(bookId);
        return book ? true : false;
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
