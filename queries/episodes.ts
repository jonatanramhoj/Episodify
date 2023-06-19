import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query {
    listEpisodes {
      id
      title
      series
      description
      seasonNumber
      episodeNumber
      releaseDate
      imdbId
    }
  }
`;

export const GET_EPISODE = gql`
  query GetEpisode($episodeId: String!) {
    getEpisodeById(episodeId: $episodeId) {
      id
      title
      series
      description
      seasonNumber
      episodeNumber
      releaseDate
      imdbId
    }
  }
`;

export const CREATE_EPISODE_MUTATION = gql`
  mutation CreateEpisode($episode: EpisodeInput!) {
    createEpisode(episode: $episode) {
      title
    }
  }
`;

export const UPDATE_EPISODE_MUTATION = gql`
  mutation UpdateEpisode($episode: UpdateEpisodeInput!) {
    updateEpisode(episode: $episode) {
      title
    }
  }
`;

export const DELETE_EPISODE_MUTATION = gql`
  mutation DeleteEpisode($episodeId: String!) {
    deleteEpisode(episodeId: $episodeId)
  }
`;

export const SEARCH_QUERY = gql`
  query SearchQuery($search: String) {
    listEpisodes(search: $search) {
      id
      title
      series
    }
  }
`;
