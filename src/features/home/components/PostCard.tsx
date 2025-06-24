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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { allowEdit } from "@/utils/allowEdit";
import TimeAgo from "@/utils/timeAgo";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import {
  Edit3,
  Ellipsis,
  Heart,
  ImagePlus,
  MessageCircleMore,
  Trash2,
  XSquareIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLike } from "../hooks/useLike";
import { usePostUpdate } from "../hooks/usePostUpdate";
import { Thread } from "../schemas/thread.types";

export const PostCard = (thread: Thread) => {
  const currentUser = useAuthStore((state) => state.user);
  const isOwner = thread.user?.id === currentUser?.id;

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const onClickPost = () => navigate({ to: `/post/${thread.id}` });

  const [editedPost, setEditedPost] = useState(thread);

  const { isPendingLike, handleLike, isPendingUnlike, handleUnlike } =
    useLike();

  const {
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
    ...restRegisterImage
  } = usePostUpdate(thread.id);

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
        <Avatar
          onClick={() => navigate({ to: `/profile/${thread.user?.username}` })}
          className="hover:ring-1 hover:ring-offset-[2px] hover:ring-offset-background cursor-pointer"
        >
          <AvatarImage
            src={
              thread.user?.profile?.avatarUrl ||
              `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${thread.user?.profile?.fullName}`
            }
            alt="user-avatar"
          />
        </Avatar>
        <div className="flex flex-col gap-1.5 w-full justify-between">
          <div className="flex justify-between items-center">
            <div className="flex gap-1.5 items-center">
              <span className="text-sm font-semibold">
                {thread.user?.profile?.fullName}
              </span>
              <span className="text-sm text-muted-foreground hidden md:block">
                @{thread.user?.username}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                <TimeAgo date={thread.createdAt} />
              </span>
              <span className="text-xs text-muted-foreground">
                {thread.isEdited && <span>(edited)</span>}
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
                    {allowEdit(thread.createdAt) && (
                      <DropdownMenuItem
                        onClick={() => {
                          setIsEditing(true);
                          setPreviewURL(thread.images || null);
                          handleFileChange;
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
          <form onSubmit={handleSubmit(onSubmitPost)}>
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex flex-row gap-4">
                    <Textarea
                      {...register("content")}
                      value={editedPost.content}
                      onChange={(e) =>
                        setEditedPost((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                    />
                    <Input
                      {...restRegisterImage}
                      className="hidden"
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
                    />
                  </div>
                  <div>
                    {previewURL && (
                      <div className="relative inline-block">
                        <Separator className="my-4" />
                        <img
                          src={previewURL}
                          alt="image preview"
                          className="w-full object-contain rounded border md:w-1/2 md:h-1/2"
                        />
                        <Button
                          onClick={() => {
                            handleRemoveFile();
                            setPreviewURL(null);
                          }}
                          variant={"destructive"}
                          size={"icon"}
                          className="absolute top-10 left-2"
                        >
                          <XSquareIcon />
                        </Button>
                      </div>
                    )}
                    <Separator className="my-4" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Button
                    onClick={handleInputFile}
                    type="button"
                    size={"sm"}
                    variant={"outline"}
                    className="text-xs"
                  >
                    <ImagePlus className="text-primary" />
                    {previewURL ? (
                      <span className="text-xs hidden md:block">
                        Change Image
                      </span>
                    ) : (
                      <span className="text-xs hidden md:block">Add Image</span>
                    )}
                  </Button>
                  <div className="flex gap-2">
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
                        setPreviewURL(null);
                        handleRemoveFile();
                      }}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div onClick={onClickPost} className="cursor-pointer">
                  <p className="text-secondary-foreground text-pretty hover:text-muted-foreground break-words">
                    {thread.content}
                  </p>
                </div>
                <div>
                  <img
                    src={thread.images}
                    className="w-full md:w-1/2 rounded object-contain"
                  />
                </div>
              </div>
            )}
          </form>
          <div className="flex justify-between">
            {isEditing === false && (
              <div className="flex gap-2">
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
                  <span className="text-xs text-muted-foreground">
                    {thread.repliesCount > 1 ? (
                      <div>{thread.repliesCount} Replies</div>
                    ) : (
                      <div>{thread.repliesCount} Reply</div>
                    )}
                  </span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  );
};
