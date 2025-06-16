import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "@tanstack/react-router";
import { CalendarClock, Heart, MessageCircleMore } from "lucide-react";
import { useLike } from "../hooks/useLike";
import { Thread } from "../schemas/thread.types";

export const PostDetailCard = (thread: Thread) => {
  const navigate = useNavigate();
  const { isPendingLike, handleLike, isPendingUnlike, handleUnlike } =
    useLike();

  return (
    <div>
      <div className="flex gap-4 items-center w-full">
        <Avatar
          className="hover:ring-1 hover:ring-offset-[2px] hover:ring-offset-background cursor-pointer"
          onClick={() => navigate({ to: `/profile/${thread.user?.username}` })}
        >
          <AvatarImage
            src={
              thread.user?.profile?.avatarUrl ||
              `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${thread.user?.profile?.fullName}`
            }
            alt="user-avatar"
          />
        </Avatar>
        <div
          className="flex flex-col justify-center cursor-pointer hover:text-primary"
          onClick={() => navigate({ to: `/profile/${thread.user?.username}` })}
        >
          <span className="text-sm font-semibold">
            {thread.user?.profile?.fullName}
          </span>
          <span className="text-sm text-muted-foreground">
            @{thread.user?.username}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 w-full justify-between">
        <div>
          <p className="text-secondary-foreground mt-2">{thread.content}</p>
        </div>
        <div>
          <img
            src={thread.images}
            className="w-1/2 rounded object-contain my-2"
          />
        </div>
        <div className="flex gap-2 items-center mb-2 text-xs text-muted-foreground">
          <CalendarClock size={"14px"} />
          <span>Posted on {formatDate(thread.createdAt)}</span>
        </div>
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
          <Button variant={"ghost"} size={"sm"}>
            <MessageCircleMore />
            <span className="text-sm text-muted-foreground">
              {thread.repliesCount} Replies
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
