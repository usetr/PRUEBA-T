import CharacterGrid from "../components/CharacterGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center py-8">Personajes de Los Simpson</h1>
      <CharacterGrid />
    </main>
  );
}
