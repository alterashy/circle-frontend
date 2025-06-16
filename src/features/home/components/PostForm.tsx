import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import {
  createThreadSchema,
  CreateThreadSchemaDTO,
} from "@/schemas/thread.schema";
import { useAuthStore } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { ImagePlus, Send, XSquareIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ThreadResponseDTO } from "../schemas/thread.dto";

type PostFormProps = {
  onSuccess?: () => void;
};

export const PostForm = ({ onSuccess }: PostFormProps) => {
  const {
    user: {
      profile: { fullName, avatarUrl },
    },
  } = useAuthStore();

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

  // handle post
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<CreateThreadSchemaDTO>({
    mode: "onSubmit",
    resolver: zodResolver(createThreadSchema),
  });

  const {
    ref: registerImageRef,
    onChange: registerImageOnChange,
    ...restRegisterImage
  } = register("imageUrl");

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

  const navigate = useNavigate();
  const onSubmit = async (data: CreateThreadSchemaDTO) => {
    await mutateAsync(data);
    reset();
    handleRemoveFile();
    navigate({ to: "/" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-4">
          <Avatar>
            <AvatarImage
              src={
                avatarUrl ||
                `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${fullName}`
              }
              alt="user-avatar"
            />
          </Avatar>
          <Textarea
            {...register("content")}
            placeholder="What's on your mind?"
          />
          <Input
            {...restRegisterImage}
            id="picture"
            type="file"
            accept="image/*"
            ref={(e) => {
              registerImageRef(e);
              inputRef.current = e;
            }}
            onChange={(e) => {
              registerImageOnChange(e);
              handleFileChange(e);
            }}
            className="hidden"
          />
          <div className="flex flex-col gap-3">
            <Button type="submit" size={"icon"}>
              {isPending ? <Spinner size={"small"} /> : <Send />}
            </Button>
            <Button
              type="button"
              onClick={handleInputFile}
              size={"icon"}
              variant={"outline"}
            >
              <ImagePlus className="text-primary" />
            </Button>
          </div>
        </div>
        <div>
          {previewURL && (
            <div className="relative inline-block">
              <Separator className="my-2" />
              <img
                src={previewURL}
                alt="image preview"
                className="w-1/2 h-1/2 object-contain rounded border"
              />
              <Button
                onClick={handleRemoveFile}
                variant={"destructive"}
                size={"icon"}
                className="absolute top-6 left-2"
              >
                <XSquareIcon />
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
