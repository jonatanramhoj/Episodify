import Link from "next/link";
import { debounce } from "lodash";
import { Episode } from "@/types/episodes";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_QUERY } from "@/queries/episodes";

type SearchEpisodeProps = {
  onClose: () => void;
};

export default function SearchEpisode({ onClose }: SearchEpisodeProps) {
  const [searchEpisodes, { data }] = useLazyQuery(SEARCH_QUERY);

  const handleSearch = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        return handleClearSearch();
      }
      searchEpisodes({
        variables: { search: e.target.value },
      });
    },
    150
  );

  const handleClearSearch = () => {
    searchEpisodes({
      variables: { search: "##RESET##" },
    });
  };

  return (
    <>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Start typing to search for episodes..."
        className="bg-inherit focus:outline-none text-xl sm:text-6xl w-full text-center mb-4 sm:mb-10"
        autoFocus
        onChange={handleSearch}
        autoComplete="off"
      />
      {data?.listEpisodes?.length > 0 && (
        <ul className="w-full max-w-[600px]">
          {data.listEpisodes.slice(0, 10).map((episode: Episode) => (
            <li
              key={episode.id}
              className="border-b border-white/50 last:border-none"
            >
              <Link
                href={episode.id}
                className="py-4 block group"
                onClick={onClose}
              >
                <h3 className="sm:text-lg group-hover:text-[#C266FF] transition ease-in-out">
                  <span className="font-bold">{episode.title}</span> -{" "}
                  <span className="text-gray-300 group-hover:text-inherit block sm:inline-block">
                    {episode.series}
                  </span>
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
