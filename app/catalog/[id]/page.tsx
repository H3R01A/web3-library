'use client'
import axios from "axios";
import { Book } from "@/app/utils/types";
import { useEffect, useState } from 'react'

interface PageProps {
  params: { id: number };
}

export default function BookPage({ params }: PageProps) {

  const data = params;

  const [likes, setLikes] = useState(0)
  const [bookData, setBookData] = useState<Book | null>(null)

  useEffect(() => {


    const getData = async () => {

      const bookID = data.id;

      const response = await axios.get(`http://localhost:3000/api/getBook/${bookID}`);

      setBookData(response.data)
    }

    void getData();

  }, [bookData])

  const handleLike = async () => {


  }

  if (!bookData) {
    return (<h1>Loading Book Data....</h1>)
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg">Book Title: {bookData.title}</h1>
      <h2 className="text-md">Book Description: {bookData.description}</h2>
      <p>Author's Wallet Address: {bookData.walletAddress}</p>
      <p>Number of likes: {bookData.likes}</p>
      <button className="mt-8 bg-sky-500 p-5 hover:bg-sky-800 rounded-md">Like</button>
    </div>
  );
}