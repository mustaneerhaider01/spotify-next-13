"use client";

import Box from "@/components/Box";

const Error = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <h1 className="text-lg md:text-2xl font-bold text-neutral-400">
        Something went wrong while loading the songs.
      </h1>
    </Box>
  );
};

export default Error;
