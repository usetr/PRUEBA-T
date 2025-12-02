import { Character } from "../types/character";

interface ModalProps {
  character: Character | null;
  onClose: () => void;
}

export default function Modal({ character, onClose }: ModalProps) {
  if (!character) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md relative">
        <button 
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >×</button>
        <img src={character.image} alt={character.fullName} className="w-full h-64 object-cover rounded" />
        <h2 className="text-2xl font-bold mt-4">{character.fullName}</h2>
        <p><strong>Género:</strong> {character.gender === "Male" ? "♂ Hombre" : "♀ Mujer"}</p>
        <p><strong>Estado:</strong> {character.status === "Alive" ? "✅ Vivo" : character.status === "Dead" ? "💀 Muerto" : "❓ Desconocido"}</p>
        <p><strong>Edad:</strong> {character.age}</p>
        <p><strong>Ocupación:</strong> {character.occupation}</p>
        <p><strong>Locación:</strong> {character.location}</p>
        <p><strong>Voz de:</strong> {character.voicedBy}</p>
      </div>
    </div>
  );
}
