import Input from "./Input";
import { Episode } from "@/types/episodes";

type FormProps = {
  title: string;
  episode?: Episode;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleClose: () => void;
};

export default function Form({
  title,
  episode,
  handleSubmit,
  handleChange,
  handleClose,
}: FormProps) {
  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit}>
      <h2 className="font-bold text-3xl mb-8 self-start">{title}</h2>
      <Input
        label="Title"
        type="text"
        name="title"
        id="title"
        placeholder="Enter episode title"
        onChange={handleChange}
        defaultValue={episode?.title || ""}
      />
      <Input
        label="Series"
        type="text"
        name="series"
        id="series"
        placeholder="Enter series name"
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
          placeholder="Enter episode description"
          onChange={handleChange}
          required
          defaultValue={episode?.description || ""}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Season #"
          type="number"
          name="seasonNumber"
          id="seasonNumber"
          placeholder="#"
          onChange={handleChange}
          defaultValue={episode?.seasonNumber || ""}
        />
        <Input
          label="Episode #"
          type="number"
          name="episodeNumber"
          id="episodeNumber"
          placeholder="#"
          onChange={handleChange}
          defaultValue={episode?.episodeNumber || ""}
        />
        <Input
          label="Release date"
          type="text"
          name="releaseDate"
          id="releaseDate"
          placeholder="Date"
          onChange={handleChange}
          defaultValue={episode?.releaseDate || ""}
        />
      </div>
      <Input
        label="IMDB ID"
        type="text"
        name="imdbId"
        id="imdbId"
        placeholder="e.g., tt4574334"
        onChange={handleChange}
        defaultValue={episode?.imdbId || ""}
      />
      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm mr-4 text-gray-300 hover:text-gray-400 font-bold ease-in duration-150"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-sm font-bold py-4 px-6 rounded-md flex items-center bg-[#32CD32] hover:bg-[#228B22] ease-in duration-150"
        >
          Save
        </button>
      </div>
    </form>
  );
}
