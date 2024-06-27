import { Hono } from "hono";
import { BookSchema } from "../validators";
import { zValidator } from "@hono/zod-validator";
import { createBook, deleteBook, getBook, getBooks, updateBook } from "./books.controller";

export const bookRouter = new Hono();

bookRouter.get('/books', getBooks);
bookRouter.get('/books/:id', getBook);

bookRouter.post("/books", zValidator("json", BookSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createBook);

bookRouter.put("/books/:id", updateBook);
bookRouter.delete("/books/:id", deleteBook);
