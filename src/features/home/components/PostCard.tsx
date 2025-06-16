import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit3, Heart, MessageCircleMore, Trash2 } from "lucide-react";
import { Thread } from "../schemas/thread.types";
import { useNavigate } from "@tanstack/react-router";
import TimeAgo from "@/utils/timeAgo";
import { useAuthStore } from "@/stores/auth.store";
import { Separator } from "@/components/ui/separator";
import { useLike } from "../hooks/useLike";

export const PostCard = (thread: Thread) => {
  const currentUser = useAuthStore((state) => state.user);
  const isOwner = thread.user?.id === currentUser?.id;

  const navigate = useNavigate();
  const onClickPost = () => navigate({ to: `/post/${thread.id}` });

  const { isPendingLike, handleLike, isPendingUnlike, handleUnlike } =
    useLike();

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
            </div>
          </div>
          <div onClick={onClickPost} className="cursor-pointer">
            <p className="text-secondary-foreground hover:text-muted-foreground">
              {thread.content}
            </p>
          </div>
          <div>
            <img src={thread.images} className="w-1/2 rounded object-contain" />
          </div>
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
                {thread.likesCount > 0 ? (
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
                  <Button variant={"ghost"} size={"sm"}>
                    <Edit3 size={14} />
                    <span className="text-xs text-muted-foreground">Edit</span>
                  </Button>
                  <Button variant={"ghost"} size={"sm"}>
                    <Trash2 />
                    <span className="text-xs text-muted-foreground">
                      Delete
                    </span>
                  </Button>
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
