import Link from "next/link";
import Image from "next/image";
import { Episode } from "@/types/episodes";
import Eye from "./icons/Eye";
import Edit from "./icons/Edit";
import Delete from "./icons/Delete";

export default function Teaser({ episode }: { episode: Episode }) {
  return (
    <Link
      href={episode.id}
      className="group rounded-2xl shadow-lg w-full h-full relative overflow-hidden"
    >
      <Image
        src={episode.posterUrl || "/seinfeld.webp"}
        alt=""
        width={600}
        height={300}
        className="rounded-2xl max-h-[280px] object-cover"
      />

      <div className="backdrop-blur-lg bg-[#39464C]/30 p-5 w-full absolute bottom-0 rounded-2xl flex flex-col items-center justify-between">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col mr-1">
            <span className="font-bold text-md text-[#E9EAEB] block mb-1 truncate text-ellipsis max-w-[260px] md:max-w-[260px] lg:max-w-[350px]">
              {episode.title}
            </span>{" "}
            <span className="text-gray-300 text-sm">
              {episode.series} - S{episode.seasonNumber}:E
              {episode.episodeNumber}
            </span>
          </div>
          <div className="border-l border-l-white/30 ml-4 pl-4 flex-shrink-0">
            <div className="grid grid-cols-3 gap-0.5 my-2 content-center">
              <button className="fill-white/70 hover:bg-white/30 p-2 rounded-full flex items-center justify-center ease-in-out duration-150">
                <Eye />
              </button>
              <button className="fill-white/70 stroke-white/70 hover:bg-white/30 p-2 rounded-full flex items-center justify-center ease-in-out duration-150">
                <Edit />
              </button>
              <button className="fill-white/70 hover:bg-white/30 p-2 rounded-full flex items-center justify-center ease-in-out duration-150">
                <Delete />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
