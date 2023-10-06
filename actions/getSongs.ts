import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongs = async (): Promise<Song[]> => {
  const supabaseClient = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabaseClient
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data || [];
};

export default getSongs;
