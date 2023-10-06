import Box from "@/components/Box";

const Loading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <h1 className="font-bold text-3xl animate-pulse">Loading songs...</h1>
    </Box>
  );
};

export default Loading;
