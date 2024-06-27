import { db } from '../drizzle/db';
import { eq } from 'drizzle-orm';
import { Books, TIBook, TSBook } from '../drizzle/schema';
//Get all cities

export const getBooksService = async (limit?: number):Promise<TSBook[]  | null> => {
    if(limit) {
        return await db.select().from(Books)
    }
    return await db.select().from(Books);
}

export const getBookService = async (id: number): Promise<TSBook | undefined> => {
    const BooksArray = await db.select().from(Books).where(eq(Books.id, id)).execute();

    if (BooksArray.length === 0) {
        return undefined;
    }

    return BooksArray[0];
}
//create a new Books
export const createBookService = async (Book:TIBook) =>{
    await db.insert(Books).values(Book)
    return "Book created successfully";
}

export const updateBookService = async (id: number, Book:TIBook) => {
    await db.update(Books).set(Book).where(eq(Books.id, id))
    return "Book updated successfully";
}

export const deleteBookService = async (id: number) => {
    await db.delete(Books).where(eq(Books.id, id))
    return "Books deleted successfully";
}

