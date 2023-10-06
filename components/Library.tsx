"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

type Props = {
  songs: Song[];
};

const Library = ({ songs }: Props) => {
  const { onOpen } = useAuthModal();
  const { onOpen: onOpenUploadModal } = useUploadModal();
  const { user } = useUser();
  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return onOpen();
    }
    onOpenUploadModal();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="font-medium text-neutral-400">Your Library</p>
        </div>

        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 hover:text-white cursor-pointer transition"
        />
      </div>

      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem
            key={song.id}
            data={song}
            onClick={() => onPlay(song.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;