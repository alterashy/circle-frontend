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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { CreateThreadSchemaDTO } from "@/schemas/thread.schema";
import { useAuthStore } from "@/stores/auth.store";
import TimeAgo from "@/utils/timeAgo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import {
  Edit3,
  Heart,
  ImagePlus,
  MessageCircleMore,
  Trash2,
  XSquareIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useLike } from "../hooks/useLike";
import { ThreadResponseDTO } from "../schemas/thread.dto";
import { Thread } from "../schemas/thread.types";

export const PostCard = (thread: Thread) => {
  const currentUser = useAuthStore((state) => state.user);
  const isOwner = thread.user?.id === currentUser?.id;

  const navigate = useNavigate();
  const onClickPost = () => navigate({ to: `/post/${thread.id}` });

  const { isPendingLike, handleLike, isPendingUnlike, handleUnlike } =
    useLike();

  // todo: handle update

  const inputRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [imageFileList, setImageFileList] = useState<FileList | null>(null);
  const [editedPost, setEditedPost] = useState<{
    content: string;
    imageUrl: string | undefined;
  }>({
    content: thread.content,
    imageUrl: thread.images,
  });

  const handleInputFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
      setImageFileList(e.target.files);
    }
  };

  const handleRemoveFile = () => {
    setPreviewURL(null);
    setImageFileList(null);
    inputRef.current!.value = "";
  };

  const queryClient = useQueryClient();

  const { isPending: isPendingUpdate, mutateAsync: mutateUpdate } = useMutation<
    ThreadResponseDTO,
    Error,
    {
      content: string;
      imageUrl: FileList;
    }
  >({
    mutationKey: ["update-thread"],
    mutationFn: async (data: CreateThreadSchemaDTO) => {
      const formData = new FormData();
      formData.append("content", data.content);
      if (data.imageUrl) {
        formData.append("images", data.imageUrl[0]);
      }
      const response = await api.put<ThreadResponseDTO>(
        `/threads/${thread.id}`,
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
      setIsEditing(false);
      await queryClient.invalidateQueries({ queryKey: ["threads"] });
      toast.success("Post updated successfully!");
    },
  });

  const handleDelete = async () => {
    try {
      await api.delete(`/threads/${thread.id}`);
      await queryClient.invalidateQueries({ queryKey: ["threads"] });
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
        <div>
          <Avatar className="hover:ring-1 hover:ring-offset-[2px] hover:ring-offset-background cursor-pointer">
            <AvatarImage
              src={
                thread.user?.profile?.avatarUrl ||
                `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${thread.user?.profile?.fullName}`
              }
              alt="user-avatar"
            />
          </Avatar>
        </div>
        <div className="flex flex-col gap-1.5 w-full justify-between">
          <div className="flex justify-between items-center">
            <div className="flex gap-1.5 items-center">
              <span className="text-sm font-semibold">
                {thread.user?.profile?.fullName}
              </span>
              <span className="text-sm text-muted-foreground">
                @{thread.user?.username}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                <TimeAgo date={thread.createdAt} />
              </span>
              <span className="text-sm text-muted-foreground">
                {thread.isEdited && <span>(edited)</span>}
              </span>
            </div>
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-2">
              <div>
                <div className="flex flex-row gap-4">
                  <Textarea
                    value={editedPost.content}
                    onChange={(e) =>
                      setEditedPost((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                  />
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={(e) => handleFileChange(e)}
                    className="hidden"
                  />
                </div>
                <div>
                  {previewURL && (
                    <div className="relative inline-block">
                      <Separator className="my-4" />
                      <img
                        src={previewURL}
                        alt="image preview"
                        className="w-1/2 h-1/2 object-contain rounded border"
                      />
                      <Button
                        onClick={handleRemoveFile}
                        variant={"destructive"}
                        size={"icon"}
                        className="absolute top-10 left-2"
                      >
                        <XSquareIcon />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  onClick={handleInputFile}
                  size={"sm"}
                  variant={"outline"}
                  className="text-xs"
                >
                  <ImagePlus className="text-primary" />
                  {previewURL ? (
                    <span className="text-xs">Change Image</span>
                  ) : (
                    <span className="text-xs">Add Image</span>
                  )}
                </Button>
                <div className="flex gap-2">
                  <Button
                    disabled={isPendingUpdate}
                    size="sm"
                    variant={"default"}
                    type="submit"
                    onClick={() =>
                      mutateUpdate({
                        content: editedPost.content,
                        imageUrl: imageFileList ?? new DataTransfer().files,
                      })
                    }
                    className="text-xs"
                  >
                    {isPendingUpdate ? "Updating..." : "Update"}
                  </Button>
                  <Button
                    size="sm"
                    variant={"destructive"}
                    onClick={() => {
                      setIsEditing(false);
                      setEditedPost({
                        content: thread.content,
                        imageUrl: thread.images,
                      });
                      setPreviewURL(thread.images || null);
                      handleRemoveFile();
                    }}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
              <Separator className="my-4" />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div onClick={onClickPost} className="cursor-pointer">
                <p className="text-secondary-foreground hover:text-muted-foreground break-words">
                  {thread.content}
                </p>
              </div>
              <div>
                <img
                  src={thread.images}
                  className="w-1/2 rounded object-contain"
                />
              </div>
            </div>
          )}
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Button
                variant={"ghost"}
                size={"sm"}
                disabled={isPendingLike || isPendingUnlike}
                onClick={() =>
                  thread.isLiked
                    ? handleUnlike({ threadId: thread.id })
                    : handleLike({ threadId: thread.id })
                }
              >
                {thread.isLiked ? (
                  <Heart color="#E74C3C" fill="#E74C3C" />
                ) : (
                  <Heart />
                )}
                <span className="text-sm text-muted-foreground">
                  {thread.likesCount}
                </span>
              </Button>
              <Button variant={"ghost"} size={"sm"} onClick={onClickPost}>
                <MessageCircleMore />
                <span className="text-sm text-muted-foreground">
                  {thread.repliesCount} Replies
                </span>
              </Button>
            </div>
            <div>
              {isOwner && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setIsEditing(true);
                      setPreviewURL(thread.images || null);
                    }}
                    variant={"ghost"}
                    size={"sm"}
                  >
                    <Edit3 size={14} />
                    <span className="text-xs text-muted-foreground">Edit</span>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" variant={"ghost"} size={"sm"}>
                        <Trash2 />
                        <span className="text-xs text-muted-foreground">
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
                          This action cannot be undone. This will permanently
                          delete your Post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <span className="text-xs text-muted-foreground">
                            Cancel
                          </span>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            type="submit"
                            onClick={() => handleDelete()}
                            variant={"destructive"}
                            size={"sm"}
                          >
                            <span className="text-xs text-secondary-foreground">
                              Delete
                            </span>
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  );
};
