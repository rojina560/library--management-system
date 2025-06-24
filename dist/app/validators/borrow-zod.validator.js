"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBorrowZodSchema = void 0;
const zod_1 = require("zod");
exports.createBorrowZodSchema = zod_1.z.object({
    book: zod_1.z.string(),
    quantity: zod_1.z.number(),
    dueDate: zod_1.z.string()
});
