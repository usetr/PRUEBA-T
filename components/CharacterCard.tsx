import { Character } from "../types/character";

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform"
      onClick={() => onClick(character)}
    >
      <img src={character.image} alt={character.fullName} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{character.fullName}</h3>
        <p>{character.occupation}</p>
      </div>
    </div>
  );
}
