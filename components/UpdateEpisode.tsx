import { useState } from "react";
import { Episode } from "@/types/episodes";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_EPISODE_MUTATION } from "@/queries/episodes";
import Form from "./Form";

type UpdateEpisodeProps = {
  closeModal: () => void;
  episode: Episode;
  refetch: () => void;
};

export default function UpdateEpisode({
  closeModal,
  episode,
  refetch,
}: UpdateEpisodeProps) {
  const [updateEpisode] = useMutation(UPDATE_EPISODE_MUTATION);

  const [formData, setFormData] = useState({
    series: episode.series || "",
    title: episode.title || "",
    description: episode.description || "",
    seasonNumber: episode.seasonNumber || "",
    episodeNumber: episode.episodeNumber || "",
    releaseDate: episode.releaseDate || "",
    imdbId: episode.imdbId || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      updateEpisode({
        variables: {
          episode: { id: episode.id, ...formData },
        },
        onCompleted: (data) => {
          closeModal();
          toast.info(
            `The Episode "${data.updateEpisode.title}" was successfully updated!`
          );
          refetch();
        },
      });
    } catch (error) {
      toast.error(`Something went wrong: ${error}`);
    }
  };

  return (
    <Form
      title="Update Episode"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      episode={episode}
    />
  );
}
