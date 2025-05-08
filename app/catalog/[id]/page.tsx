'use client'
import axios from "axios";
import { Book } from "@/app/utils/types";
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';


interface PageProps {
  params: { id: number };
}

export default function BookPage() {

  const params = useParams();
  const { id } = params;

  const [likes, setLikes] = useState(0)
  const [bookData, setBookData] = useState<Book | null>(null)

  useEffect(() => {

    const getData = async () => {

      const bookID = id;

      const response = await axios.get(`/api/getBook/${bookID}`);

      console.log(response)

      setBookData(response.data)
      setLikes(response.data.likes ?? 0)
    }

    void getData();

  }, [])

  const handleLike = async (id: number) => {

    try {

      await axios.post(`/api/addBookLike/${id}`, {totalLikes: likes + 1})

      setLikes(() => likes + 1)

    } catch (error) {

    }

  }

  if (!bookData) {
    return (<h1>Loading Book Data....</h1>)
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg">Book Title: {bookData.title}</h1>
      <h2 className="text-md">Book Description: {bookData.description}</h2>
      <p>Author's Wallet Address: {bookData.walletAddress}</p>
      <p>Number of likes: {likes}</p>
      <button className="mt-8 bg-sky-500 p-5 hover:bg-sky-800 rounded-md" onClick={() => handleLike(bookData.id)}>Like</button>
    </div>
  );
}