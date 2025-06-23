import { model, Schema } from "mongoose";
import { BorrowLogicStatic, IBorrowBooks } from "../interface/borrow-interface";
import { Book } from "../models/book-model";




const borrowSchema = new Schema<IBorrowBooks, BorrowLogicStatic>(
    {
        book: {
            type: Schema.Types.ObjectId,
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
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// pre hook
borrowSchema.pre("save", async function (next) {
    const book = await Book.findById(this.book);
    if (!book) throw new Error("Book Do Not Exist!")

    if (book.copies < this.quantity) throw new Error("Not Enough Book Copies Available!")
    next()
});

// static method
borrowSchema.static("deductCopies", async function (bookId: string, quantity: number) {
    const book = await Book.findById(bookId);
    if (book) {
        book.copies -= quantity;
        if (book.copies === 0) {
            book.available = false;
        }
        const updatedBook = await Book.findByIdAndUpdate(bookId, { copies: book.copies, available: book.available })

        return updatedBook
    }
});

// post hook
borrowSchema.post("save", async function () {
    await Borrow.deductCopies(this.book.toString(), this.quantity)
});


export const Borrow = model<IBorrowBooks, BorrowLogicStatic>("Borrow", borrowSchema)