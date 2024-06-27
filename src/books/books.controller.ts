import { Context } from "hono";
import { createBookService, deleteBookService, getBookService, getBooksService, updateBookService } from "./books.service";

export const getBooks = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getBooksService(limit);
        if (!data || data.length === 0) {
            return c.text("Book not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getBook = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const book = await getBookService(id);
    if (!book) {
        return c.text("Book not found", 404);
    }
    return c.json(book, 200);
};

export const createBook = async (c: Context) => {
    try {
        const book = await c.req.json();
        const createdBook = await createBookService(book);
        if (!createdBook) return c.text("Book not created", 404);
        return c.json({ msg: createdBook }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateBook = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const book = await c.req.json();
    try {
        // Search for the book
        const searchedBook = await getBookService(id);
        if (searchedBook == undefined) return c.text("Book not found", 404);

        // Get the data and update it
        const res = await updateBookService(id, book);
        // Return a success message
        if (!res) return c.text("Book not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}


export const deleteBook = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const book = await getBookService(id);
        if (!book) return c.text("Book not found", 404);
        const res = await deleteBookService(id);
        if (!res) return c.text("Book not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
