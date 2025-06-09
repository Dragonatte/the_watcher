export const buildTMDBUrl = (
  item: "movie" | "tv",
  path: string,
  key: string = "fc9400b112e2492160091b91b3e0f18d",
  language: string = "es-ES",
  page?: number,
): string => {
  const pageExt: string = page ? `&page=${page}` : "";

  return `https://api.themoviedb.org/3/${item}/${path}?api_key=${key}&language=${language}${pageExt}`;
};
