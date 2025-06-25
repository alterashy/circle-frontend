import { Button } from "@/components/ui/button";
import { useFollow } from "../hooks/useFollow";
import { useAuthStore } from "@/stores/auth.store";

type Props = {
  targetUserId: string;
  isFollow: boolean;
};

export const FollowButton = ({ targetUserId, isFollow }: Props) => {
  const { user } = useAuthStore();
  const { follow, unfollow } = useFollow();

  const handleClick = () => {
    if (!user?.id) return;

    if (isFollow) {
      unfollow.mutate({ followerId: user.id, followingId: targetUserId });
    } else {
      follow.mutate({ followerId: user.id, followingId: targetUserId });
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={follow.isPending || unfollow.isPending}
    >
      {isFollow ? "Unfollow" : "Follow"}
    </Button>
  );
};
