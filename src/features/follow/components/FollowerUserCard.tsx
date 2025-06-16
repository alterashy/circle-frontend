import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Follow } from "../schemas/follow.type";

type FollowUserProps = {
  FollowUser: Follow;
};

export const FollowerUserCard = ({ FollowUser }: FollowUserProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center w-full">
          <Avatar
            className="cursor-pointer hover:ring-1 hover:ring-offset-[2px] hover:ring-offset-background"
            onClick={() =>
              navigate({
                to: `/profile/${FollowUser?.following?.username}`,
              })
            }
          >
            <AvatarImage
              src={
                FollowUser?.following?.profile?.avatarUrl ||
                `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${FollowUser?.following?.profile?.fullName}`
              }
              alt="user-avatar"
            />
          </Avatar>
          <div
            className="flex flex-col justify-center cursor-pointer hover:text-primary"
            onClick={() =>
              navigate({ to: `/profile/${FollowUser?.following?.username}` })
            }
          >
            <span className="text-xs font-semibold">
              {FollowUser?.following?.profile?.fullName}
            </span>
            <span className="text-xs text-muted-foreground">
              @{FollowUser?.following?.username}
            </span>
          </div>
        </div>
        <div>
          <Button variant={"outline"} size={"sm"}>
            <span className="text-xs">Follow</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
