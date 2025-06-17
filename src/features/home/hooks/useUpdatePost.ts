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

export const useUpdatePost = (postId: string, data: UpdateThreadSchemaDTO) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleInputFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);

      console.log(url);
    }
  };

  const handleRemoveFile = () => {
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
    }
    setPreviewURL(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    } else {
      console.warn("inputRef belum tersedia saat handleRemoveFile");
    }
  };

  const onUpdatePost = async (data: UpdateThreadSchemaDTO) => {
    await mutateUpdate(data);
    resetUpdate();
    handleRemoveFile();
    navigate({ to: "/" });

    console.log(data);
  };

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    reset: resetUpdate,
    formState: { errors },
  } = useForm<UpdateThreadSchemaDTO>({
    mode: "onSubmit",
    resolver: zodResolver(updateThreadSchema),
    defaultValues: {
      content: data.content,
      imageUrl: data.imageUrl,
    },
  });

  const {
    ref: registerImageRef,
    onChange: registerImageOnChange,
    ...restRegisterImage
  } = registerUpdate("imageUrl");

  // Handle Post
  const { isPending: isPendingUpdate, mutateAsync: mutateUpdate } = useMutation<
    ThreadResponseDTO,
    Error,
    UpdateThreadSchemaDTO
  >({
    mutationKey: ["update-post"],
    mutationFn: async (data: UpdateThreadSchemaDTO) => {
      const formData = new FormData();
      formData.append("content", data.content);

      // Upload gambar baru jika ada
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
      setIsEditing(false);
      await queryClient.invalidateQueries({
        queryKey: ["threads"],
      });
      toast.success("Post updated successfully!");
    },
  });

  return {
    registerUpdate,
    handleSubmitUpdate,
    errors,
    isEditing,
    setIsEditing,
    isPendingUpdate,
    onUpdatePost,
    inputRef,
    previewURL,
    setPreviewURL,
    handleInputFile,
    handleFileChange,
    handleRemoveFile,
    registerImageRef,
    registerImageOnChange,
    ...restRegisterImage,
  };
};
