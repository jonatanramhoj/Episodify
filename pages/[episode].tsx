import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import UpdateEpisode from "@/components/UpdateEpisode";
import Loader from "@/components/Loader";
import {
  GET_EPISODE,
  GET_EPISODES,
  DELETE_EPISODE_MUTATION,
} from "@/queries/episodes";
import { toast } from "react-toastify";
import { fetchEpisodePoster } from "@/utils/fetchEpisodePoster";
import { Episode, EpisodeData, EpisodesData } from "@/types/episodes";
import Modal from "@/components/Modal";

export default function EpisodeDetailsPage() {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [episode, setEpisode] = useState<Episode | null>(null);

  const { data, refetch, error } = useQuery<EpisodeData>(GET_EPISODE, {
    variables: { episodeId: router.query.episode },
  });

  const { refetch: refetchEpisodes } = useQuery<EpisodesData>(GET_EPISODES);

  const [deleteEpisode] = useMutation(DELETE_EPISODE_MUTATION);

  const episodeData = data?.getEpisodeById;
  const imdbId = data?.getEpisodeById?.imdbId;

  useEffect(() => {
    const getEpisodePoster = async () => {
      if (episodeData && imdbId) {
        const poster = await fetchEpisodePoster(imdbId);
        setEpisode({ ...episodeData, posterUrl: poster });
      }
    };
    getEpisodePoster();
  }, [episodeData, imdbId]);

  const openModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    if (episode) {
      if (confirm("Are you sure you want to delete the episode?")) {
        deleteEpisode({
          variables: { episodeId: episode.id },
          onCompleted: () => {
            router.push("/");
            toast.info(`The Episode ${episode.title} was deleted`, {
              delay: 100,
            });
            refetchEpisodes();
          },
        });
      }
    }
  };

  if (!episode) {
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

  return (
    <>
      <main className="flex flex-col items-center h-screen">
        <div className="max-w-2xl p-6">
          <div className="pb-6 border-b border-white/20">
            <Image
              src={episode?.posterUrl || "/seinfeld.webp"}
              alt=""
              width={800}
              height={300}
              className="mb-6 rounded-3xl max-h-[350px] sm:max-h-[420px] object-cover"
            />
            <h2 className="text-3xl mb-4">
              <span className="font-bold mb-2">{episode?.title}</span>{" "}
              <span className="text-gray-300">({episode?.series})</span>
            </h2>
            <p className="mb-4">{episode?.releaseDate}</p>
            <div className="bg-white rounded-3xl px-2 inline-block mb-4">
              <span className="text-sm text-gray-600 font-bold">
                S{episode?.seasonNumber} : E{episode?.episodeNumber}
              </span>
            </div>
            <p className="text-gray-200">{episode?.description}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-end">
            <button
              onClick={openModal}
              className="outline-none w-full sm:w-auto text-sm font-bold py-4 px-4 rounded-md flex justify-center items-center bg-[#32CD32] hover:bg-[#228B22] ease-in duration-150 mb-4 sm:mb-0 sm:mr-4"
            >
              Update episode
              <svg
                className="fill-white w-6 h-6 ml-2"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
                  fillRule="nonzero"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="text-sm font-bold py-4 px-4 rounded-md flex justify-center items-center bg-[#DC143C] hover:bg-[#A6142B] ease-in duration-150"
            >
              Delete episode
              <svg
                className="fill-white w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
              </svg>
            </button>
          </div>
        </div>
        <Modal isOpen={modalIsOpen} onClose={closeModal}>
          <UpdateEpisode
            closeModal={closeModal}
            episode={episode as Episode}
            refetch={refetch}
          />
        </Modal>
      </main>
    </>
  );
}
