import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ReplyEntity } from "@/entities/reply.entity";
import { useAuthStore } from "@/stores/auth.store";
import TimeAgo from "@/utils/timeAgo";
import { Edit3, Heart, Trash2 } from "lucide-react";

export const PostRelpyCard = (reply: ReplyEntity) => {
  const currentUser = useAuthStore((state) => state.user);
  const isOwner = reply.user?.id === currentUser?.id;

  return (
    <div>
      <div className="flex gap-4">
        <div>
          <Avatar className="hover:ring-1 hover:ring-offset-[2px] hover:ring-offset-background cursor-pointer">
            <AvatarImage
              src={
                reply.user?.profile?.avatarUrl ||
                `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${reply.user?.profile?.fullName}`
              }
              alt="user-avatar"
            />
          </Avatar>
        </div>
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
            </div>
          </div>
          <p className="text-secondary-foreground">{reply.content}</p>
          {/* <img src="" className="w-1/2 rounded object-contain" /> */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant={"ghost"} size={"sm"}>
                <Heart color="#E74C3C" fill="#E74C3C" />
                <span className="text-sm text-muted-foreground">0</span>
              </Button>
            </div>
            <div>
              {isOwner && (
                <div>
                  <Button variant={"ghost"} size={"sm"}>
                    <Edit3 />
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
    </div>
  );
};
