import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit3, Heart, MessageCircleMore, Trash2 } from "lucide-react";

export const PostCard = () => {
  return (
    <div>
      <div className="flex gap-2">
        <div>
          <Avatar className="mr-2 mt-2">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="user-avatar"
            />
          </Avatar>
        </div>
        <div className="flex flex-col gap-1.5 w-full justify-between">
          <div className="flex justify-between items-center">
            <div className="flex gap-1.5 items-center">
              <span className="font-semibold">Fullname</span>
              <span className="text-sm text-muted-foreground">@username</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">timestamp</span>
            </div>
            <div>
              <Button variant={"ghost"} size={"sm"}>
                <Edit3 />
                <span className="text-sm text-muted-foreground">Edit</span>
              </Button>
              <Button variant={"ghost"} size={"sm"}>
                <Trash2 />
                <span className="text-sm text-muted-foreground">Delete</span>
              </Button>
            </div>
          </div>
          <p className="text-secondary-foreground text-justify">Content</p>
          <img src="" className="w-1/2 rounded object-contain" />
          <div className="flex gap-2">
            <Button variant={"ghost"} size={"sm"}>
              <Heart color="#E74C3C" fill="#E74C3C" />
              <span className="text-sm text-muted-foreground">76</span>
            </Button>
            <Button variant={"ghost"} size={"sm"}>
              <MessageCircleMore />
              <span className="text-sm text-muted-foreground">19 Replies</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
