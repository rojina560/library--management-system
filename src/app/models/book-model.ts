import { model, Schema } from "mongoose";
import { BookCheckStaticMethod, IBook } from "../interface/book-interface";


const bookSchema = new Schema<IBook, BookCheckStaticMethod>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// static method for checking book existence 

bookSchema.static("isBookExists", async function (bookId: string) {
  const book = await Book.findById(bookId)
  return book ? true : false
})


export const Book = model<IBook, BookCheckStaticMethod>("Book", bookSchema);