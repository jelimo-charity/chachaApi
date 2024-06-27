import { Context } from "hono";
import { createBookService, deleteBookService, getBookService, getBooksService, updateBookService } from "./books.service";

export const getBooks = async (c: Context) => {
    try {
        //limit the number of Books to be returned

        const limit = Number(c.req.query('limit'))

        const data = await getBooksService(limit);
        if (data == null || data.length == 0) {
            return c.text("Book not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getBook = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Book = await getBookService(id);
    if (Book == undefined) {
        return c.text("Book not found", 404);
    }
    return c.json(Book, 200);
}
export const createBook = async (c: Context) => {
    try {
        const Book = await c.req.json();
        const createdBook = await createBookService(Book);


        if (!createdBook) return c.text("Book not created", 404);
        return c.json({ msg: createdBook }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateBook = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Book = await c.req.json();
    try {
        // search for the Book
        const searchedBook = await getBookService(id);
        if (searchedBook == undefined) return c.text("Book not found", 404);
        // get the data and update it
        const res = await updateBookService(id, Book);
        // return a success message
        if (!res) return c.text("Book not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteBook = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Book
        const Book = await getBookService(id);
        if (Book == undefined) return c.text("Book not found", 404);
        //deleting the Book
        const res = await deleteBookService(id);
        if (!res) return c.text("Book not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}