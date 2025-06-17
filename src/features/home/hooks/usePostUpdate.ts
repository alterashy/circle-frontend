import { api } from "@/lib/api";
import {
  updateThreadSchema,
  UpdateThreadSchemaDTO,
} from "@/schemas/thread.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ThreadResponseDTO } from "../schemas/thread.dto";

export const usePostUpdate = (postId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  };

  const handleRemoveFile = () => {
    setPreviewURL(null);
    inputRef.current!.value = "";
  };

  const handleDeleteImage = () => {
    // registerImageRef.current!.value = "";
  };

  const onSubmitPost = async (data: UpdateThreadSchemaDTO) => {
    await mutateUpdate(data);
    setIsEditing(false);
    reset();
    handleRemoveFile();
    navigate({ to: "/" });

    console.log("Update Post Data: ", data); // log the post data
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateThreadSchemaDTO>({
    mode: "onSubmit",
    resolver: zodResolver(updateThreadSchema),
  });

  const {
    ref: registerImageRef,
    onChange: registerImageOnChange,
    ...restRegisterImage
  } = register("imageUrl");

  const { isPending: isPendingUpdate, mutateAsync: mutateUpdate } = useMutation<
    ThreadResponseDTO,
    Error,
    UpdateThreadSchemaDTO
  >({
    mutationKey: ["update-thread"],
    mutationFn: async (data: UpdateThreadSchemaDTO) => {
      const formData = new FormData();
      formData.append("content", data.content);

      if (data.imageUrl && data.imageUrl.length > 0) {
        formData.append("images", data.imageUrl[0]);
      }

      const response = await api.put<ThreadResponseDTO>(
        `/threads/${postId}`,
        formData
      );

      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
      toast.error("Something went wrong!");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["threads"],
      });
      reset();
      toast.success("Post updated successfully!");
    },
  });

  return {
    register,
    handleSubmit,
    reset,
    errors,
    onSubmitPost,
    isPendingUpdate,
    inputRef,
    previewURL,
    setPreviewURL,
    handleInputFile,
    handleFileChange,
    handleRemoveFile,
    registerImageRef,
    registerImageOnChange,
    isEditing,
    setIsEditing,
    ...restRegisterImage,
  };
};
