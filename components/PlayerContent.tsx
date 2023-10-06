"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikedButton from "./LikedButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { IconType } from "react-icons";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayerStore from "@/hooks/usePlayerStore";
import { useEffect, useState } from "react";
// @ts-ignore
import useSound from "use-sound";

type Props = {
  song: Song;
  songUrl: string;
};

const PlayerContent = ({ song, songUrl }: Props) => {
  const player = usePlayerStore();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon: IconType = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon: IconType = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentSongIndex = player.ids.findIndex(
      (id) => id === player.activeId
    );
    const nextSong = player.ids[currentSongIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentSongIndex = player.ids.findIndex(
      (id) => id === player.activeId
    );
    const previousSong = player.ids[currentSongIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      {/* Song */}
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikedButton songId={song.id} />
        </div>
      </div>

      {/* Mobile Player */}
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <button
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full p-1 bg-white"
        >
          <Icon className="text-black" size={30} />
        </button>
      </div>

      {/* Desktop Player */}
      <div className="hidden md:flex h-full items-center justify-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          size={30}
        />

        <button
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full p-1 bg-white"
        >
          <Icon className="text-black" size={30} />
        </button>

        <AiFillStepForward
          onClick={onPlayNext}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          size={30}
        />
      </div>

      {/* Desktop Player Controls */}
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center w-[120px] gap-x-2">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
