
import Link from "next/link";
import axios from "axios";
import { Book } from "../utils/types";


export default async function BookCatalog() {

    const response = await axios.get('http://localhost:3000/api/getBooks');

    const books = response.data;

    return (
        <div className="flex flex-col items-center">
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