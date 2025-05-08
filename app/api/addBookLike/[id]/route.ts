import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { totalLikes } = body;
    const bookId = req.url.split('/').pop(); // Get the ID from the URL
    const response: { success: boolean } = { success: false };

    try {
        // Check if the database instance has been initialized
        if (!db) {
            db = await open({
                filename: "./bookcollection.db",
                driver: sqlite3.Database,
            });
        }

        // Update the likes count for the specific book
        const updateSql = `UPDATE items SET likes = ? WHERE id = ?`;
        const result = await db.run(updateSql, [totalLikes, bookId]);
        
        if (result) {
            response.success = true;
            console.log(`Updated likes for book ID ${bookId} to ${totalLikes}`);
        } else {
            console.log(`No book found with ID ${bookId}`);
        }

        // Close the database connection
        await db.close();
        console.log("Closed the database connection.");

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error },
            { status: 500 }
        );
    }
}