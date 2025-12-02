import { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import Modal from "./Modal";
import { Character } from "../types/character";

export default function CharacterGrid() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selected, setSelected] = useState<Character | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCharacters = async (page: number) => {
    setLoading(true);
    const res = await fetch(`https://thesimpsonsapi.com/api/characters?page=${page}&limit=12`);
    const data = await res.json();
    setCharacters(data);
    setLoading(false);
  };

  
    useEffect(() => {
  // Definir función async dentro del useEffect
  const loadCharacters = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://thesimpsonsapi.com/api/characters?page=${page}&limit=12`);
      const data = await res.json();
      setCharacters(data);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  loadCharacters();


  }, [page]);

  return (
    <div>
      {loading ? (
        <p className="text-center mt-10">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {characters.map((char) => (
            <CharacterCard key={char.id} character={char} onClick={setSelected} />
          ))}
        </div>
      )}

      {/* Paginación */}
      <div className="flex justify-center space-x-4 mt-4">
        <button 
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>
        <span className="px-4 py-2">{page}</span>
        <button 
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </button>
      </div>

      <Modal character={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
