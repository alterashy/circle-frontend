import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { ReplyEntity } from "@/entities/reply.entity";
import { api } from "@/lib/api";
import {
  updateReplySchema,
  UpdateReplySchemaDTO,
} from "@/schemas/reply.schema";
import { useAuthStore } from "@/stores/auth.store";
import { allowEdit } from "@/utils/allowEdit";
import TimeAgo from "@/utils/timeAgo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { Edit3, Ellipsis, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ReplyResponseDTO } from "../schemas/reply.dto";

export const PostRelpyCard = (reply: ReplyEntity) => {
  const currentUser = useAuthStore((state) => state.user);
  const isOwner = reply.user?.id === currentUser?.id;
  const queryClient = useQueryClient();
  const { postId } = useParams({ from: "/(dashboard)/post/$postId" });
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedReply, setEditedReply] = useState(reply);

  const { register, handleSubmit, reset } = useForm<UpdateReplySchemaDTO>({
    mode: "onSubmit",
    resolver: zodResolver(updateReplySchema),
  });

  const { isPending: isPendingUpdate, mutateAsync: mutateUpdate } = useMutation<
    ReplyResponseDTO,
    Error,
    UpdateReplySchemaDTO
  >({
    mutationKey: ["update-thread"],
    mutationFn: async (data: UpdateReplySchemaDTO) => {
      const formData = new FormData();
      formData.append("content", data.content);

      const response = await api.put<ReplyResponseDTO>(
        `/replies/${postId}`,
        formData
      );

      console.log(response.data);
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

  const onSubmitReply = async (data: UpdateReplySchemaDTO) => {
    await mutateUpdate(data);
    setIsEditing(false);
    navigate({ to: "/" });
  };

  // handle delete
  const handleDelete = async () => {
    try {
      await api.delete(`/replies/${reply.id}`);
      await queryClient.invalidateQueries({
        queryKey: [`threads/${postId}`],
      });
      toast.success("Post deleted successfully!");
    } catch (error) {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <div className="flex gap-4">
        <Avatar
          onClick={() => navigate({ to: `/profile/${reply.user?.username}` })}
          className="hover:ring-1 hover:ring-offset-[2px] hover:ring-offset-background cursor-pointer"
        >
          <AvatarImage
            src={
              reply.user?.profile?.avatarUrl ||
              `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${reply.user?.profile?.fullName}`
            }
            alt="user-avatar"
          />
        </Avatar>
        <div className="flex flex-col gap-1.5 w-full justify-between">
          <div className="flex justify-between items-center">
            <div className="flex gap-1.5 items-center">
              <span className="text-sm font-semibold">
                {reply.user?.profile?.fullName}
              </span>
              <span className="text-xs text-muted-foreground">
                @{reply.user?.username}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                <TimeAgo date={reply.createdAt} />
              </span>
              <span className="text-xs text-muted-foreground">
                {reply.isEdited && <span>(edited)</span>}
              </span>
            </div>
            <div>
              {isOwner && isEditing === false && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-fit ml-2 mr-2">
                    {allowEdit(reply.createdAt) && (
                      <DropdownMenuItem
                        onClick={() => {
                          setIsEditing(true);
                        }}
                        className="text-xs text-secondary-foreground cursor-pointer"
                      >
                        <Edit3 className="text-xs text-secondary-foreground" />
                        <span className="text-xs font-semibold">Edit</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button type="button" variant={"ghost"} size={"sm"}>
                            <Trash2 className="text-xs text-secondary-foreground" />
                            <span className="text-xs text-secondary-foreground">
                              Delete
                            </span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your Post.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              type="button"
                              className="text-xs"
                            >
                              <span>Cancel</span>
                            </AlertDialogCancel>
                            <AlertDialogAction
                              type="submit"
                              onClick={() => handleDelete()}
                              className="text-xs"
                            >
                              <Trash2 />
                              <span>Delete</span>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmitReply)}>
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <div>
                  <Textarea
                    {...register("content")}
                    value={editedReply.content}
                    onChange={(e) =>
                      setEditedReply((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant={"default"}
                    size="sm"
                    type="submit"
                    className="text-xs"
                    disabled={isPendingUpdate}
                  >
                    {isPendingUpdate ? <Spinner /> : "Update"}
                  </Button>
                  <Button
                    size="sm"
                    variant={"destructive"}
                    onClick={() => {
                      setIsEditing(false);
                    }}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-secondary-foreground text-pretty break-words">
                    {reply.content}
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
