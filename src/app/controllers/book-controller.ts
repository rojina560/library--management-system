import express, { NextFunction, Request, Response } from "express";
import { createBookZodSchema, updateBookZodSchema } from "../validators/book-zod-validator";
import { Book } from "../models/book-model";


export const bookRoutes = express.Router();


// create a book 
bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = await createBookZodSchema.parseAsync(req.body)
    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error.name === "ValidationError" ? { name: error.name, errors: error.errors } : error
    });
  }
});

// get all books 
bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query;
    const query = filter ? { genre: filter } : {};

    const books = await Book.find(query).sort({ [sortBy as string]: sort === "asc" ? 1 : -1 }).limit(parseInt(limit as string));

    // const books = await Book.find()

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Invalid Query Error",
      success: false,
      error: error,
    });
  }
});

// get single book 

bookRoutes.get("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId
    const existingBook = await Book.isBookExists(bookId)

    if (existingBook) {
      const book = await Book.findById(bookId)
      res.status(200).json(
        {
          success: true,
          message: "Book retrieved successfully",
          data: book,
        })
    } else {
      res.status(404).json(
        {
          message: "Book Does Not Exists",
          success: false,
          data: {},
        })
    }
  } catch (error: any) {
    // console.log(error)
    next(error)
  }
})

// update a book

bookRoutes.put("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId
    const updatedBookParameters = await updateBookZodSchema.parseAsync(req.body);

    const existingBook = await Book.isBookExists(bookId)

    if (existingBook) {
      const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookParameters, { new: true, runValidators: true })

      res.status(200).json(
        {
          success: true,
          message: "Book Updated successfully",
          data: updatedBook,
        })
    } else {
      res.status(404).json(
        {
          message: "Book Does Not Exists",
          success: false,
          data: {},
        })
    }

  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error.name === "ValidationError" ? { name: error.name, errors: error.errors } : error
    });
  }
})

// delete a book 

bookRoutes.delete("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId

    const existingBook = await Book.isBookExists(bookId)

    if (existingBook) {
      await Book.findByIdAndDelete(bookId)

      res.status(200).json(
        {
          success: true,
          message: "Book deleted successfully",
          data: null,
        })
    } else {
      res.status(404).json(
        {
          message: "Book Does Not Exists",
          success: false,
          data: {},
        })
    }
  } catch (error: any) {
    next(error)
  }
})
