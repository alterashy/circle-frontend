import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
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
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ReplyResponseDTO } from "../schemas/reply.dto";

export const PostReplyForm = () => {
  const { postId } = useParams({ from: "/(dashboard)/post/$postId" });
  const {
    user: {
      profile: { fullName, avatarUrl },
    },
  } = useAuthStore();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateReplySchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(createReplySchema),
  });

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
      toast.success(data.message);
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
          <Button type="submit" size={"icon"}>
            {isPending ? <Spinner size={"small"} /> : <Send />}
          </Button>
        </div>
        <div className="ml-12 mt-4">
          {errors.content && (
            <p className="text-xs text-muted-foreground">
              {errors.content.message}
            </p>
          )}
        </div>
        <Separator className="my-4" />
      </form>
    </div>
  );
};
