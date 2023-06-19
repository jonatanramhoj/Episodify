export type Episode = {
  id: string;
  title: string;
  series: string;
  description: string;
  seasonNumber: number;
  episodeNumber: number;
  releaseDate: string;
  imdbId: string;
  posterUrl?: string;
};

export type EpisodesData = {
  listEpisodes: Episode[];
};

export type EpisodeData = {
  getEpisodeById: Episode;
};
