import { Model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre:
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

// static method For checking if the book exists or not

export interface BookCheckStaticMethod extends Model<IBook> {
  isBookExists(bookId: string): boolean
}