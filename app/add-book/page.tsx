'use client'
import axios from "axios";
import { use, useState } from "react";
import Link from "next/link";


export default function AddBook() {

    const [newBookID, setNewBookID] = useState(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const bookData = {
            title: formData.get('title'),
            description: formData.get('description'),
            postedBy: formData.get('postedBy')
        }

        try {
            const response = await axios.post('/api/addBook', bookData)
            setNewBookID(response.data.id)
        } catch (error) {
            console.log('Error trying to make book submission: ', error)
        }
    };

    return (
        <div className="mt-20 flex flex-col items-center">
            <h1 className="text-lg">Add Book Details Below</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input className="w-[31rem] border border-x-0 border-t-0 border-solid border-white bg-transparent text-left text-white focus:outline-none focus:ring-0" name="title" placeholder="Enter Title" />
                <input className="w-[31rem] border border-x-0 border-t-0 border-solid border-white bg-transparent text-left text-white focus:outline-none focus:ring-0" name="description" placeholder="Description" />
                <input className="w-[31rem] border border-x-0 border-t-0 border-solid border-white bg-transparent text-left text-white focus:outline-none focus:ring-0" name="postedBy" placeholder="Enter Wallet Address" />
                <button className="mt-8 bg-sky-500 p-5 hover:bg-sky-800 rounded-md" type="submit">Add Book</button>
            </form>
            {newBookID &&
                <div>
                    <h2 className="text-md">Book Successfully Added. Check out it in the catalog</h2>
                    <Link href={`/catalog/${newBookID}`}>Check out book</Link>
                </div>}
        </div >
    );
}