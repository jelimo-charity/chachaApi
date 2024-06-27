import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

// Define the Books table schema
export const Books = pgTable('Books', {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  year: integer("year").notNull(),
});




export type TIBook = typeof Books.$inferInsert;
export type TSBook = typeof Books.$inferSelect;