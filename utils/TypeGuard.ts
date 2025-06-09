import { Movie } from "@/model/Movie.model";
import { TVShow } from "@/model/TVShow.model";

export default function typeGuardMovie(item: Movie | TVShow): item is Movie {
  return "title" in item;
}