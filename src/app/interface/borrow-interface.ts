import { Model, Types } from "mongoose";
import { IBook } from "./book-interface";


export interface IBorrowBooks {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}


export interface BorrowLogicStatic extends Model<IBook> {
  deductCopies(bookId: string, quantity: number): Promise<void>;
}