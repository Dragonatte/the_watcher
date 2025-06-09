import { Movie } from "@/model/Movie.model";
import { TMDBResponse } from "@/model/TMDBResponse.model";
import { ActionResult } from "@/model/ActionResult.model";
import s from "@/service/app.services";

export async function fetchMovies(page: number): Promise<ActionResult<Movie>> {
  try {
    const data: TMDBResponse<Movie> = await s.movies.getPaginatedMovies(page);

    return {
      error: null,
      items: data.results || [],
      pages: Math.min(data.total_pages || 1, 500),
    };
  } catch (_err) {
    return {
      error:
        "No se pudieron cargar las películas. Por favor, inténtalo de nuevo.",
      items: [],
      pages: 0,
    };
  }
}

export async function fetchMovie(id: string): Promise<Movie | null> {
  try {
    return await s.movies.getById(id);
  } catch (_err) {
    return null;
  }
}