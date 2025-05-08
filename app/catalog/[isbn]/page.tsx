
interface PageProps {
  params: { isbn: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function BookPage({ params, searchParams }: PageProps) {

  const bookID = params.isbn.toLowerCase();


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>{bookID.title}</h1>
      <h2>{bookID.description}</h2>
      <p>{bookID.postedBy}</p> //address
      <p>{bookID.likes}</p> //count
    </div>
  );
}