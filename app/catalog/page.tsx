
// (title, description, postedBy address, like count)
import Link from "next/link";

const dummyCatalog = [{ isbn: "001", title: "Wheel of Time", description: "Book about the dragon", postedBy: "456432", likes: 9 }, { isbn: "002", title: "Quantum", description: "Book about quantum computing", postedBy: "1432805", likes: 2 }, { isbn: "003", title: "Halo", description: "Back story all about Master Cheif", postedBy: "1367890", likes: 4 }]

export default function BookCatalog() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Current Catalog</h1>
            <ul>
                {dummyCatalog.map(book => (
                    <li key={book.isbn}>
                        <Link href={`/catalog/${book.isbn}`}>{book.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}