import express, { Request, Response } from 'express';

import { ZodError } from 'zod';
import { createBorrowZodSchema } from '../validators/borrow-zod.validator';
import { Borrow } from '../models/borrow-model';




export const borrowRoutes = express.Router()


// create a borrow 
borrowRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const body = await createBorrowZodSchema.parseAsync(req.body)

        const borrow = await Borrow.create(body);

        res.status(201).json({ success: true, message: "Book borrowed successfully", data: borrow });

    } catch (error: any) {

        if (error.message === "Book Do Not Exist!") {

            { res.status(404).json({ message: error.message, success: false, error: {} }) }

        } else if (error.message === "Not Enough Book Copies Available!") {
            res.status(400).json({ message: error.message, success: false, error: {} })
        } else if (error instanceof ZodError) {
            res.status(400).json({ message: "Validation failed", success: false, error: error })
        } else if (error.name === "ValidationError") {
            res.status(400).json({ message: "Validation failed", success: false, error: { name: error.name, errors: error.errors } })
        }
    }
})

// get borrowed Books Summary

borrowRoutes.get("/", async (req: Request, res: Response) => {

    try {

        const summary = await Borrow.aggregate([
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
        ])

        // console.log(summary)

        res.status(200).json({ success: true, message: "Borrowed books summary retrieved successfully", data: summary });

    } catch (error: any) {
        res.status(500).json({
            message: "Failed to retrieve borrowed books summary",
            success: false,
            error: error?.message || error,
        });
    }
})