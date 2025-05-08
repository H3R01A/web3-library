import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function GET(req: NextRequest) {

    const bookID = req.url.split("/").pop();

  try {
    // Check if the database instance has been initialized
    if (!db) {
      // If the database instance is not initialized, open the database connection
      db = await open({
        filename: "./bookcollection.db", // Specify the database file path
        driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
      });
    }

    const response = await db.get("SELECT * FROM items WHERE id = ?", bookID);

    
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
