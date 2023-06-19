import Input from "./Input";
import { Episode } from "@/types/episodes";

type FormProps = {
  title: string;
  episode?: Episode;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function Form({
  title,
  episode,
  handleSubmit,
  handleChange,
}: FormProps) {
  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit}>
      <h2 className="font-bold text-3xl mb-8 self-start">{title}</h2>
      <Input
        label="Title"
        type="text"
        name="title"
        id="title"
        placeholder="The title"
        onChange={handleChange}
        defaultValue={episode?.title || ""}
      />
      <Input
        label="Series"
        type="text"
        name="series"
        id="series"
        placeholder="The name of the series"
        onChange={handleChange}
        defaultValue={episode?.series || ""}
      />
      <div className="flex flex-col mb-8">
        <label htmlFor="description" className="text-base mb-4">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          className="text-base bg-inherit border border-white/50 rounded-md p-3 focus:outline-none focus:ring focus:ring-[#C266FF]"
          placeholder="The episode description"
          onChange={handleChange}
          required
          defaultValue={episode?.description || ""}
        />
      </div>
      <Input
        label="Season number"
        type="number"
        name="seasonNumber"
        id="seasonNumber"
        placeholder="The season number"
        onChange={handleChange}
        defaultValue={episode?.seasonNumber || ""}
      />
      <Input
        label="Episode number"
        type="number"
        name="episodeNumber"
        id="episodeNumber"
        placeholder="The episode number"
        onChange={handleChange}
        defaultValue={episode?.episodeNumber || ""}
      />
      <Input
        label="Release date"
        type="text"
        name="releaseDate"
        id="releaseDate"
        placeholder="The release date"
        onChange={handleChange}
        defaultValue={episode?.releaseDate || ""}
      />
      <Input
        label="Imdb id"
        type="text"
        name="imdbId"
        id="imdbId"
        placeholder="The imdb id"
        onChange={handleChange}
        defaultValue={episode?.imdbId || ""}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="text-sm font-bold py-4 px-4 rounded-md flex items-center bg-[#32CD32] hover:bg-[#228B22] ease-in duration-150"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
