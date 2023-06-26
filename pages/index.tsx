import { useQuery as useApolloQuery } from "@apollo/client";
import { useQueries } from "react-query";
import Loader from "@/components/Loader";
import { GET_EPISODES } from "@/queries/episodes";
import { Episode, EpisodesData } from "@/types/episodes";
import { fetchEpisodePoster } from "@/utils/fetchEpisodePoster";
import Teaser from "@/components/Teaser";

export default function Home() {
  const { loading, error, data } = useApolloQuery<EpisodesData>(GET_EPISODES);
  const episodes = data?.listEpisodes;

  // Query for all posters
  const episodePosters = useQueries(
    episodes?.map((episode: Episode) => ({
      queryKey: ["episodePoster", episode.imdbId],
      queryFn: () => fetchEpisodePoster(episode.imdbId),
    })) ?? []
  );

  // Wait for all queries to resolve before rendering
  if (loading || episodePosters.some((query) => query.isLoading)) {
    return (
      <div className="flex h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen justify-center mt-8 text-red-400">
        <span>{error.message}</span>
      </div>
    );
  }

  // Retrieve the poster data from the query results
  const postersData = episodePosters.map((query) => query.data);

  const episodesWithPosters = episodes?.map(
    (episode: Episode, index: number) => ({
      ...episode,
      posterUrl: postersData[index],
    })
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {episodesWithPosters?.map((episode: Episode) => (
          <li key={episode.id} className="flex">
            <Teaser episode={episode} />
          </li>
        ))}
      </ul>
    </main>
  );
}
