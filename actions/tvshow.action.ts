import { TVShow } from "@/model/TVShow.model";
import { TMDBResponse } from "@/model/TMDBResponse.model";
import { ActionResult } from "@/model/ActionResult.model";
import s from "@/service/app.services";

export async function fetchTVShows(
  page: number,
): Promise<ActionResult<TVShow>> {
  try {
    const data: TMDBResponse<TVShow> = await s.tvseries.getPaginatedTVShows(page);

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

export async function fetchTVShow(id: string): Promise<TVShow | null> {
  try {
    return await s.tvseries.getById(id);
  } catch (_err) {
    return null;
  }
}