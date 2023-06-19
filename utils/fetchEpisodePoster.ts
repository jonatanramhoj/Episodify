export const fetchEpisodePoster = async (imdbId: string) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${imdbId}`
  );
  const data = await response.json();
  return data.Poster;
};
