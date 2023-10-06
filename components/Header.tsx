"use client";

import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayerStore from "@/hooks/usePlayerStore";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Header = ({ className, children }: Props) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const supbaseClient = useSupabaseClient();
  const { user } = useUser();
  const player = usePlayerStore();

  const handleLogout = async () => {
    const id = toast.loading("Logging out...");

    const { error } = await supbaseClient.auth.signOut();
    // Reset any playing songs
    player.setId("");
    router.refresh();

    if (error) {
      toast.error(error.message, { id });
    } else {
      toast.success("Logged out!", { id });
    }
  };

  return (
    <header
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className
      )}
    >
      <div className="w-full flex items-center justify-between mb-4">
        <div className="hidden md:flex items-center gap-x-2">
          <button
            onClick={router.back}
            className="bg-black rounded-full flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>

          <button
            onClick={router.forward}
            className="bg-black rounded-full flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>

        <div className="flex md:hidden items-center gap-x-2">
          <button
            onClick={() => router.push("/")}
            className="rounded-full bg-white p-2 flex items-center justify-center hover:opacity-75 transition"
          >
            <HiHome size={20} className="text-black" />
          </button>

          <button
            onClick={() => router.push("/search")}
            className="rounded-full bg-white p-2 flex items-center justify-center hover:opacity-75 transition"
          >
            <BiSearch size={20} className="text-black" />
          </button>
        </div>

        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="px-6 py-2 bg-white">
                Logout
              </Button>

              <Button
                className="bg-white"
                onClick={() => router.push("/account")}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className="bg-transparent text-neutral-300"
                >
                  Sign up
                </Button>
              </div>

              <div>
                <Button onClick={onOpen} className="bg-white px-6 py-2">
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {children}
    </header>
  );
};

export default Header;
