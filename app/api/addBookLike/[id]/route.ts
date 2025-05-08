import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { totalLikes } = body;
    const bookId = req.url.split('/').pop();
    const response: { success: boolean } = { success: false };

    console.log({bookId, totalLikes})
    
    let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;
    
    try {
        db = await open({
            filename: "./bookcollection.db",
            driver: sqlite3.Database,
        });

        const updateSql = `UPDATE items SET likes = ? WHERE id = ?`;
        const result = await db.run(updateSql, [totalLikes, bookId]);
        
        if (result.changes > 0) {
            response.success = true;
            console.log(`Updated likes for book ID ${bookId} to ${totalLikes}`);
        } else {
            console.log(`No book found with ID ${bookId}`);
        }

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error },
            { status: 500 }
        );
    } finally {
        if (db) {
            await db.close();
            console.log("Closed the database connection.");
        }
    }
}