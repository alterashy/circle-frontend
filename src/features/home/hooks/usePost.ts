import { api } from "@/lib/api";
import {
  createThreadSchema,
  CreateThreadSchemaDTO,
} from "@/schemas/thread.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ThreadResponseDTO } from "../schemas/thread.dto";

export const usePost = (onSuccess?: () => void) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

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

  const onSubmitPost = async (data: CreateThreadSchemaDTO) => {
    await mutateAsync(data);
    reset();
    handleRemoveFile();
    navigate({ to: "/" });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateThreadSchemaDTO>({
    mode: "onSubmit",
    resolver: zodResolver(createThreadSchema),
  });

  const {
    ref: registerImageRef,
    onChange: registerImageOnChange,
    ...restRegisterImage
  } = register("imageUrl");

  // Handle Post
  const { isPending, mutateAsync } = useMutation<
    ThreadResponseDTO,
    Error,
    CreateThreadSchemaDTO
  >({
    mutationKey: ["create-thread"],
    mutationFn: async (data: CreateThreadSchemaDTO) => {
      const formData = new FormData();
      formData.append("content", data.content);
      if (data.imageUrl) {
        formData.append("images", data.imageUrl[0]);
      }
      const response = await api.post<ThreadResponseDTO>("/threads", formData);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
      toast.error("Something went wrong!");
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["threads"],
      });
      onSuccess?.();
      toast.success(data.message);
    },
  });

  return {
    inputRef,
    previewURL,
    handleInputFile,
    handleFileChange,
    handleRemoveFile,
    onSubmitPost,
    register,
    handleSubmit,
    errors,
    registerImageRef,
    registerImageOnChange,
    isPending,
    ...restRegisterImage,
  };
};
