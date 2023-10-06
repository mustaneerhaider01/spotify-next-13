"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

type Props = {
  data: Song;
  onClick?: (id: string) => void;
};

const MediaItem = ({ data, onClick }: Props) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    // TODO: Default to turn on player
  };

  return (
    <div
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
      onClick={handleClick}
    >
      <div className="relative rounded-md overflow-hidden min-h-[48px] min-w-[48px]">
        <Image
          src={imageUrl || "/images/liked.png"}
          alt="Media Item"
          className="object-cover"
          fill
        />
      </div>

      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
