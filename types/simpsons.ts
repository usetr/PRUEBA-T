export interface Character {
  id: number;
  name: string;
  normalized_name: string;
  gender: string | null; // "Male", "Female", etc.
  status: string | null; // "Alive", "Deceased", "Fictional"
  occupation: string | null;
  age: string | number | null; // API might return string or number
  portrait_path: string | null;
  phrases: string[];
  description?: string; // Some APIs provide this
}

export interface CharacterListResponse {
  characters: Character[]; // Adjust based on actual API response if it's wrapped
  // If the API returns a raw array, we'll handle it in the fetcher
  nextPage?: number | null;
  prevPage?: number | null;
  totalPages?: number;
}

// Helper type for the API response if it differs from our internal model
export type ApiCharacterResponse = Character;

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
