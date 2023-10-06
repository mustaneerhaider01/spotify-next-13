"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";

type Props = {
  data: Song;
  onClick: (id: string) => void;
};

const SongItem = ({ data, onClick }: Props) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 
      hover:bg-neutral-400/10 transition cursor-pointer p-3"
      onClick={() => onClick(data.id)}
    >
      <div className="relative h-full w-full aspect-square rounded-md overflow-hidden">
        <Image
          src={imagePath || "/images/liked.png"}
          alt={data.title}
          className="object-cover"
          fill
        />
      </div>

      <div className="flex flex-col w-full pt-4 gap-y-1">
        <p className="truncate font-semibold w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate w-full pb-4">
          By {data.author}
        </p>
      </div>

      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
