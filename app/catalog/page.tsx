
import Link from "next/link";
import axios from "axios";
import { Book } from "../utils/types";


export default async function BookCatalog() {

    const response = await axios.get('http://localhost:3000/api/getBooks');

    const books = response.data;

    console.log(books)

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Current Catalog</h1>
            <ul>
                {books.map((book: Book, index: number) => (
                    <li key={index}>
                        <Link href={`/catalog/${book.id}`}>{book.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}