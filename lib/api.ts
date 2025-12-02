import { Character } from "@/types/simpsons";

const API_BASE_URL = "https://thesimpsonsapi.com/api";

interface ApiResponse {
  data: Character[];
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  // Fallback if it's just an array
  [key: string]: any;
}

export async function getCharacters(page: number = 1): Promise<{ characters: Character[], totalPages: number }> {
  try {
    const res = await fetch(`${API_BASE_URL}/characters?page=${page}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch characters: ${res.status}`);
    }

    const data = await res.json();

    // Handle different possible response structures
    let characters: Character[] = [];
    let totalPages = 1;

    if (Array.isArray(data)) {
      characters = data;
      // If we get a full page (20 items), assume there are more pages. 
      // Since we don't have total count in this case, we might need a heuristic or just allow "Next" until empty.
      // However, the docs mention "1182+ characters", so ~60 pages.
      // Let's assume a high number or check if the API returns metadata.
      // If it's just an array, we can't know the total pages easily without metadata.
      // We'll set totalPages to current + 1 if we have items, to allow navigation.
      totalPages = characters.length > 0 ? page + 1 : page;
    } else if (data.data && Array.isArray(data.data)) {
      // Laravel/Standard pagination style
      characters = data.data;
      if (data.meta && data.meta.last_page) {
        totalPages = data.meta.last_page;
      } else if (data.last_page) {
        totalPages = data.last_page;
      } else {
         totalPages = 60; // Fallback based on ~1200 chars
      }
    } else if (data.results && Array.isArray(data.results)) {
      // Rick and Morty style
      characters = data.results;
      if (data.info && data.info.pages) {
        totalPages = data.info.pages;
      }
    }

    return { characters, totalPages };
  } catch (error) {
    console.error("Error fetching characters:", error);
    return { characters: [], totalPages: 0 };
  }
}

export async function getCharacterById(id: number): Promise<Character | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/characters/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching character ${id}:`, error);
    return null;
  }
}
