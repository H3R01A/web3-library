import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";


export async function POST(req: NextRequest) {
    const body = await req.json()
    const { title, description, postedBy} = body;
    const response: {id?: number} = {};

    let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

    try {
        // Check if the database instance has been initialized
        if (!db) {
            db = await open({
                filename: "./bookcollection.db",
                driver: sqlite3.Database,
            });
        }

        const value = [
            title,
            description,
            postedBy,
            `${Date.now()}`,
            0
        ];
  
        const insertSql = `INSERT INTO items(title, description, walletAddress, timestamp, likes) VALUES(?, ?, ?, ?, ?)`;
  
        const result = await db.run(insertSql, value);
        response.id = result.lastID;
        console.log(`Rows inserted, ID ${result.lastID}`);

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