"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const closeModal = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const id = toast.loading("Creating song...");

    try {
      setIsLoading(true);

      const songFile = values.song?.[0] as File;
      const imageFile = values.image?.[0] as File;

      // check for missing fields and if user is there or not
      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields", { id: id });
        return;
      }

      // generate a uninque id for song
      const uniqueID = uniqid();

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload.", { id: id });
      }

      // Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload.", { id: id });
      }

      // Add song to supabase
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          song_path: songData.path,
          image_path: imageData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message, { id: id });
      }

      router.refresh();
      toast.success("Song created!", { id: id });
      closeModal();
    } catch {
      toast.error("Something went wrong", { id: id });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Add a song"
      description="Upload an mp3 file"
      onClose={closeModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          {...(errors["title"] && {
            className: "border-red-500 bg-red-500/10",
          })}
          placeholder="Song title"
        />

        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          {...(errors["author"] && {
            className: "border-red-500 bg-red-500/10",
          })}
          placeholder="Song author"
        />

        <div className="space-y-1">
          <label htmlFor="song">Select a song file</label>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", { required: true })}
            {...(errors["song"] && {
              className: "border-red-500 bg-red-500/10",
            })}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="image">Select an image</label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", { required: true })}
            {...(errors["image"] && {
              className: "border-red-500 bg-red-500/10",
            })}
          />
        </div>

        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
