import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import { Follow } from "../schemas/follow.type";

export const useFollow = () => {
  const currentUser = useAuthStore((state) => state.user);

  const { data: followers, isLoading: isLoadingFollowers } = useQuery<Follow[]>(
    {
      queryKey: ["followers", currentUser?.id],
      queryFn: async () => {
        const response = await api.get(`/follows/followers/${currentUser?.id}`);
        return response.data;
      },
    }
  );

  const { data: followings, isLoading: isLoadingFollowings } = useQuery<
    Follow[]
  >({
    queryKey: ["followings", currentUser?.id],
    queryFn: async () => {
      const response = await api.get(`/follows/followings/${currentUser?.id}`);
      return response.data;
    },
  });

  const checkFollowing = (followingId: string) => {
    return followings?.some((following) => following.id === followingId);
  };

  return {
    followers,
    isLoadingFollowers,
    followings,
    isLoadingFollowings,
    checkFollowing,
  };
};
