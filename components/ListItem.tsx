"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

type Props = {
  image: string;
  name: string;
  href: string;
};

const ListItem = ({ image, name, href }: Props) => {
  const router = useRouter();

  const authModal = useAuthModal();
  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className="relative group flex items-center rounded-md gap-x-4 overflow-hidden bg-neutral-100/10
      hover:bg-neutral-100/20 transition pr-4"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image src={image} fill alt="Liked" className="object-cover" />
      </div>

      <p className="truncate py-5 font-bold">{name}</p>

      <div
        className="absolute opacity-0 transition rounded-full flex items-center justify-center bg-green-500 p-4
      drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110"
      >
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
