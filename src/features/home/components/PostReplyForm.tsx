import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import {
  createReplySchema,
  CreateReplySchemaDTO,
} from "@/schemas/reply.schema";
import { useAuthStore } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { isAxiosError } from "axios";
// import { ImagePlus, Send, XSquareIcon } from "lucide-react";
// import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ReplyResponseDTO } from "../schemas/reply.dto";
import { Spinner } from "@/components/ui/spinner";
import { Send } from "lucide-react";

export const PostReplyForm = () => {
  const { postId } = useParams({ from: "/(dashboard)/post/$postId" });
  const {
    user: {
      profile: { fullName, avatarUrl },
    },
  } = useAuthStore();

  // const inputRef = useRef<HTMLInputElement>(null);
  // const [previewURL, setPreviewURL] = useState<string | null>(null);

  // const handleInputFile = () => {
  //   inputRef.current?.click();
  // };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file && file.type.startsWith("image/")) {
  //     const url = URL.createObjectURL(file);
  //     setPreviewURL(url);
  //   }
  // };

  // const handleRemoveFile = () => {
  //   setPreviewURL(null);
  //   inputRef.current!.value = "";
  // };

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<CreateReplySchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(createReplySchema),
  });

  // const {
  //   ref: registerImageRef,
  //   onChange: registerImageOnChange,
  //   ...restRegisterImage
  // } = register("content");

  const { isPending, mutateAsync } = useMutation<
    ReplyResponseDTO,
    Error,
    CreateReplySchemaDTO
  >({
    mutationKey: ["create-reply"],
    mutationFn: async (data: CreateReplySchemaDTO) => {
      const response = await api.post<ReplyResponseDTO>(
        `/replies/${postId}`,
        data
      );
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
      toast.error("Something went wrong!");
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [`threads/${postId}`] });
      toast.success(data.message, { autoClose: 1000 });
      console.log(data);
      reset({ content: "" });
    },
  });

  const onSubmit = async (data: CreateReplySchemaDTO) => {
    await mutateAsync(data);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (!postId) {
    return <div>Reply not found</div>;
  }

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
            placeholder="Share your thoughts..."
          />
          {/* <Input
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
          /> */}
          <div className="flex flex-col gap-3">
            <Button type="submit" size={"icon"}>
              {isPending ? <Spinner size={"small"} /> : <Send />}
            </Button>
            {/* <Button
              type="button"
              onClick={handleInputFile}
              size={"icon"}
              variant={"outline"}
            >
              <ImagePlus className="text-primary" />
            </Button> */}
          </div>
        </div>
        {/* <div>
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
        </div> */}
        <Separator className="my-4" />
      </form>
    </div>
  );
};
