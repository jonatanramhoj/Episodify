import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { GET_EPISODES, CREATE_EPISODE_MUTATION } from "@/queries/episodes";
import Form from "./Form";

type CreateEpisodeProps = {
  onClose: () => void;
};

export default function CreateEpisode({ onClose }: CreateEpisodeProps) {
  const { refetch } = useQuery(GET_EPISODES);
  const [addEpisode] = useMutation(CREATE_EPISODE_MUTATION);

  const [formData, setFormData] = useState({
    series: "",
    title: "",
    description: "",
    seasonNumber: "",
    episodeNumber: "",
    releaseDate: "",
    imdbId: "",
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
      const uniqueId = nanoid();
      addEpisode({
        variables: {
          episode: { id: uniqueId, ...formData },
        },
        onCompleted: (data) => {
          onClose();
          toast.info(
            `Successfully added the new Episode: "${data.createEpisode.title}"`
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
      title="Add a New Episode"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}
