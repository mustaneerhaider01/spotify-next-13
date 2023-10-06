import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import Image from "next/image";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();

  return (
    <div
      className="bg-neutral-900
      h-full
      w-full
      md:rounded-lg
      overflow-hidden
      overflow-y-auto"
    >
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:w-44 lg:h-44">
              <Image
                src="/images/liked.png"
                alt="Playlist"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-y-2 mt-4 md:mt-0 text-white">
              <p className="hidden md:block text-sm font-semibold">Playlist</p>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>

      <LikedContent songs={songs} />
    </div>
  );
};

export default Liked;
