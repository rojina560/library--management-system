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
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("../models/book-model");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book ID is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be a positive integer"],
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
    },
}, {
    versionKey: false,
    timestamps: true,
});
// pre hook
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.Book.findById(this.book);
        if (!book)
            throw new Error("Book Do Not Exist!");
        if (book.copies < this.quantity)
            throw new Error("Not Enough Book Copies Available!");
        next();
    });
});
// static method
borrowSchema.static("deductCopies", function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.Book.findById(bookId);
        if (book) {
            book.copies -= quantity;
            if (book.copies === 0) {
                book.available = false;
            }
            const updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, { copies: book.copies, available: book.available });
            return updatedBook;
        }
    });
});
// post hook
borrowSchema.post("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.Borrow.deductCopies(this.book.toString(), this.quantity);
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
