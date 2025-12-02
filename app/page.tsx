import { getCharacters } from "@/lib/api";
import CharacterList from "@/components/CharacterList";
import Pagination from "@/components/Pagination";
import Image from "next/image";

interface HomeProps {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const currentPage = Number(searchParams.page) || 1;
  const { characters, totalPages } = await getCharacters(currentPage);

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
      <header className="flex flex-col items-center justify-center mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-simpsons-yellow drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wider mb-4 stroke-black text-stroke-2">
          LOS SIMPSONS
        </h1>
        <p className="text-xl text-gray-600 font-medium max-w-2xl">
          Explora los personajes de Springfield
        </p>
      </header>

      <section>
        {characters.length > 0 ? (
          <>
            <CharacterList characters={characters} />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-400">No characters found</h2>
            <p className="text-gray-500 mt-2">Try checking your connection or the API status.</p>
          </div>
        )}
      </section>

     
    </main>
  );
}
