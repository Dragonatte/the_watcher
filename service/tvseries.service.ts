import axios, { AxiosResponse } from "axios";

import { TMDBResponse } from "@/model/TMDBResponse.model";
import { TVShow } from "@/model/TVShow.model";
import { buildTMDBUrl } from "@/utils/tmdbapi/ulrBuilder";
import {ServicesConfig} from "@/types/ServicesConfig";
export const tvSeriesService = (config: ServicesConfig) => ({
  getPopularTVSeries: async (page: number = 1): Promise<TVShow[]> => {
    try {
      const res: AxiosResponse<TMDBResponse<TVShow>> = await axios.get<
        TMDBResponse<TVShow>
      >(
        //`${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}`,
        buildTMDBUrl(
          "tv",
          "popular",
          "fc9400b112e2492160091b91b3e0f18d",
          config.language,
          page,
        ),
      );

      if (res.status !== 200) throw new Error("Error fetching popular movies");

      return res.data.results;
    } catch (_error) {
      console.error("Error fetching popular movies:", _error);

      return Promise.reject(new Error("Error fetching popular movies"));
    }
  },

  getFeaturedTVSeries: async (): Promise<TVShow[]> => {
    try {
      const res: AxiosResponse<TMDBResponse<TVShow>> = await axios.get<
        TMDBResponse<TVShow>
      >(
        //`${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}`,
        //`https://api.themoviedb.org/3/tv/now_playing?api_key=fc9400b112e2492160091b91b3e0f18d&language=es-ES&page=1`,
        buildTMDBUrl(
          "tv",
          "now_playing",
          "fc9400b112e2492160091b91b3e0f18d",
          config.language,
          1,
        ),
      );

      if (res.status !== 200) throw new Error("Error fetching popular movies");

      return res.data.results.slice(0, 5);
    } catch (error) {
      console.error("Error fetching popular movies:", error);

      return Promise.reject(new Error("Error fetching popular movies"));
    }
  },

  getById: async (id: string): Promise<TVShow> => {
    try {
      const res: AxiosResponse<TVShow> = await axios.get<TVShow>(
        //`${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}`,
        //`https://api.themoviedb.org/3/tv/${id}?api_key=fc9400b112e2492160091b91b3e0f18d&language=es-ES`,
        buildTMDBUrl(
          "tv",
          id,
          "fc9400b112e2492160091b91b3e0f18d",
          config.language,
        ),
      );

      if (res.status !== 200) throw new Error("Error fetching popular movies");

      return res.data;
    } catch (error) {
      console.error("Error fetching popular movies:", error);

      return Promise.reject(new Error("Error fetching popular movies"));
    }
  },

  getPaginatedTVShows: async (page: number): Promise<TMDBResponse<TVShow>> => {
    try {
      const res: AxiosResponse<TMDBResponse<TVShow>> = await axios.get<
        TMDBResponse<TVShow>
      >(
        //`${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}`,
        //`https://api.themoviedb.org/3/tv/popular?api_key=fc9400b112e2492160091b91b3e0f18d&language=es-ES&page=${page}`,
        buildTMDBUrl(
          "tv",
          "popular",
          "fc9400b112e2492160091b91b3e0f18d",
          config.language,
          page,
        ),
      );

      if (res.status !== 200) throw new Error("Error fetching popular movies");

      return res.data;
    } catch (error) {
      console.error("Error fetching popular movies:", error);

      return Promise.reject(new Error("Error fetching popular movies"));
    }
  },

  getImageUrl: (path: string, size: string = "original"): string => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },
});
