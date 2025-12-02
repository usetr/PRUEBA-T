import Image from "next/image";
import { Character } from "@/types/simpsons";

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

export const getStatusIcon = (status: string | null) => {
  const s = status?.toLowerCase();
  if (s === "alive") return "🟢";
  if (s === "deceased" || s === "dead") return "💀";
  return "❓";
};

export const getGenderIcon = (gender: string | null) => {
  const g = gender?.toLowerCase();
  if (g === "male") return "♂️";
  if (g === "female") return "♀️";
  return "❓";
};

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  return (
    <div 
      onClick={() => onClick(character)}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100 group"
    >
      <div className="relative h-64 w-full bg-gray-50">
        {character.portrait_path ? (
          <Image
            src={character.portrait_path.startsWith('http') ? character.portrait_path : `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`}
            alt={character.name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate" title={character.name}>
          {character.name}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1" title={`Status: ${character.status}`}>
            <span>{getStatusIcon(character.status)}</span>
            <span className="capitalize">{character.status || "Unknown"}</span>
          </div>
          
          <div className="flex items-center gap-1" title={`Gender: ${character.gender}`}>
            <span>{getGenderIcon(character.gender)}</span>
            <span className="capitalize">{character.gender || "Unknown"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
