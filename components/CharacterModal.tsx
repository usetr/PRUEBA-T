"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Character } from "@/types/simpsons";
import { getGenderIcon, getStatusIcon } from "./CharacterCard";
import { X } from "lucide-react";

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !character) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-simpsons-blue/10 p-8 flex items-center justify-center min-h-[300px]">
            <div className="relative w-full h-64 md:h-80">
              {character.portrait_path && (
                <Image
                  src={character.portrait_path.startsWith('http') ? character.portrait_path : `https://cdn.thesimpsonsapi.com/1280${character.portrait_path}`}
                  alt={character.name}
                  fill
                  className="object-contain drop-shadow-xl"
                />
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{character.name}</h2>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium flex items-center gap-2">
                {getStatusIcon(character.status)} {character.status || "Unknown"}
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium flex items-center gap-2">
                {getGenderIcon(character.gender)} {character.gender || "Unknown"}
              </span>
              {character.age && (
                <span className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
                  🎂 {character.age} years
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Occupation</h3>
                <p className="text-lg text-gray-800">{character.occupation || "Unknown"}</p>
              </div>

              {character.phrases && character.phrases.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Famous Phrases</h3>
                  <ul className="space-y-2">
                    {character.phrases.slice(0, 3).map((phrase, idx) => (
                      <li key={idx} className="text-gray-700 italic border-l-4 border-simpsons-yellow pl-3">
                        "{phrase}"
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {character.description && (
                 <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Description</h3>
                  <p className="text-gray-700 mt-1">{character.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
