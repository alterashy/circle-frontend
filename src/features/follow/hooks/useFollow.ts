import { FollowResponseDTO } from "@/features/search/schemas/follow.dto";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Follow } from "../schemas/follow.type";

export const useFollow = () => {
  const currentUser = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

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

  const follow = useMutation({
    mutationFn: async ({
      followerId,
      followingId,
    }: {
      followerId: string;
      followingId: string;
    }) => {
      const res = await api.post<FollowResponseDTO>("/follows", {
        followerId,
        followingId,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Followed successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("Failed to follow");
    },
  });

  const unfollow = useMutation({
    mutationFn: async ({
      followerId,
      followingId,
    }: {
      followerId: string;
      followingId: string;
    }) => {
      const res = await api.delete<FollowResponseDTO>("/follow", {
        data: { followerId, followingId },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Unfollowed successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("Failed to unfollow");
    },
  });

  return {
    followers,
    isLoadingFollowers,
    followings,
    isLoadingFollowings,
    follow,
    unfollow,
  };
};
