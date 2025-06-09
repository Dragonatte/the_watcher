import axios, { AxiosResponse } from "axios";

import { TMDBResponse } from "@/model/TMDBResponse.model";
import { Movie } from "@/model/Movie.model";
import { buildTMDBUrl } from "@/utils/tmdbapi/ulrBuilder";
import { ServicesConfig } from "@/types/ServicesConfig";

export const movieService = (config: ServicesConfig) => ({
  getPopularMovies: async (page: number = 1): Promise<Movie[]> => {
    setTimeout(() => {}, 10000);
    try {
      const res: AxiosResponse<TMDBResponse<Movie>> = await axios.get<
        TMDBResponse<Movie>
      >(
        //`${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}`,
        //`https://api.themoviedb.org/3/movie/popular?api_key=fc9400b112e2492160091b91b3e0f18d&language=${language}&page=${page}`,
        buildTMDBUrl(
          "movie",
          "popular",
          "fc9400b112e2492160091b91b3e0f18d",
          config.language,
          page,
        ),
      );

      if (res.status !== 200) throw new Error("Error fetching popular movies");

      return res.data.results;
    } catch (error) {
      //console.error("Error fetching popular movies:", error);

      return Promise.reject(new Error("Error fetching popular movies"));
    }
  },

  getPaginatedMovies: async (page: number): Promise<TMDBResponse<Movie>> => {
    try {
      const res: AxiosResponse<TMDBResponse<Movie>> = await axios.get<
        TMDBResponse<Movie>
      >(
        //`${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}`,
        //`https://api.themoviedb.org/3/movie/popular?api_key=fc9400b112e2492160091b91b3e0f18d&language=es-ES&page=${page}`,
        buildTMDBUrl(
          "movie",
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

  getFeaturedMovies: async (): Promise<Movie> => {
    try {
      const res: AxiosResponse<TMDBResponse<Movie>> = await axios.get<
        TMDBResponse<Movie>
      >(
        //`${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}`,
        //`https://api.themoviedb.org/3/movie/now_playing?api_key=fc9400b112e2492160091b91b3e0f18d&language=es-ES&page=1`,
        buildTMDBUrl(
          "movie",
          "now_playing",
          "fc9400b112e2492160091b91b3e0f18d",
          config.language,
          1,
        ),
      );

      if (res.status !== 200) throw new Error("Error fetching popular movies");

      return res.data.results[5];
    } catch (error) {
      console.error("Error fetching popular movies:", error);

      return Promise.reject(new Error("Error fetching popular movies"));
    }
  },

  getImageUrl: (path: string, size: string = "original"): string => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },

  getById: async (id: string): Promise<Movie> => {
    try {
      const res: AxiosResponse<Movie> = await axios.get<Movie>(
        //`${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}`,
        //`https://api.themoviedb.org/3/movie/${id}?api_key=fc9400b112e2492160091b91b3e0f18d&language=es-ES`,
        buildTMDBUrl(
          "movie",
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
});
