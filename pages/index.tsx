import Link from "next/link";
import Image from "next/image";
import { useQuery as useApolloQuery } from "@apollo/client";
import { useQueries } from "react-query";
import Loader from "@/components/Loader";
import { GET_EPISODES } from "@/queries/episodes";
import { Episode, EpisodesData } from "@/types/episodes";
import { fetchEpisodePoster } from "@/utils/fetchEpisodePoster";

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
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {episodesWithPosters?.map((episode: Episode) => (
          <li key={episode.id} className="flex">
            <Link
              href={episode.id}
              className="group rounded-xl flex flex-col sm:flex-row shadow-lg w-full h-full scale-100 hover:scale-105 ease-in-out duration-150"
            >
              <Image
                src={episode.posterUrl || "/seinfeld.webp"}
                alt=""
                width={500}
                height={200}
                className="max-h-[240px] sm:max-h-[160px] md:max-h-[240px] lg:max-h-[300px] 2xl:max-h-[160px] object-cover rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl sm:rounded-bl-xl"
              />
              <div className="rounded-b-xl sm:rounded-bl-none sm:rounded-br-xl sm:rounded-tr-xl h-full group-hover:bg-white backdrop-blur-sm bg-white/30 ease-in duration-150 p-5 w-full flex justify-between">
                <div className="flex flex-col group-hover:text-gray-600 mr-1">
                  <span className="font-bold text-md">{episode.title}</span>{" "}
                  <span className="text-gray-300 group-hover:text-gray-400">
                    {episode.series}
                  </span>
                  <span className="text-sm text-gray-300 group-hover:text-gray-400">
                    {episode.releaseDate}
                  </span>
                </div>
                <div className="bg-white rounded-3xl px-2 inline-block flex-shrink-0 h-fit">
                  <span className="text-sm text-gray-600 font-bold">
                    S{episode.seasonNumber} : E{episode.episodeNumber}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
