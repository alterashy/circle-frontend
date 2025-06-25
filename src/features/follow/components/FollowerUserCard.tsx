import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useFollow } from "../hooks/useFollow";
import { Follow } from "../schemas/follow.type";

type FollowUserProps = {
  FollowUser: Follow;
};

export const FollowerUserCard = ({ FollowUser }: FollowUserProps) => {
  const navigate = useNavigate();

  const { follow, unfollow } = useFollow();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center w-full">
          <Avatar
            className="cursor-pointer hover:ring-1 hover:ring-offset-[2px] hover:ring-offset-background"
            onClick={() =>
              navigate({
                to: `/profile/${FollowUser?.follower?.username}`,
              })
            }
          >
            <AvatarImage
              src={
                FollowUser?.follower?.profile?.avatarUrl ||
                `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${FollowUser?.follower?.profile?.fullName}`
              }
              alt="user-avatar"
            />
          </Avatar>
          <div
            className="flex flex-col justify-center cursor-pointer hover:text-primary"
            onClick={() =>
              navigate({ to: `/profile/${FollowUser?.follower?.username}` })
            }
          >
            <span className="text-xs font-semibold">
              {FollowUser?.follower?.profile?.fullName}
            </span>
            <span className="text-xs text-muted-foreground">
              @{FollowUser?.follower?.username}
            </span>
          </div>
        </div>
        <div>
          <Button
            variant={FollowUser.isFollow ? "secondary" : "outline"}
            size="sm"
            disabled={follow.isPending || unfollow.isPending}
            onClick={() => {
              if (FollowUser.isFollow) {
                unfollow.mutate({
                  followerId: FollowUser.follower?.id,
                  followingId: FollowUser.following?.id,
                });
              } else {
                follow.mutate({
                  followerId: FollowUser.follower?.id,
                  followingId: FollowUser.following?.id,
                });
              }
            }}
          >
            <span className="text-xs">
              {FollowUser.isFollow ? "Unfollow" : "Follow"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
