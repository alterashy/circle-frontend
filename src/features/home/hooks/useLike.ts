import { api } from "@/lib/api";
import { LikeDTO, UnlikeDTO } from "@/schemas/like.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { LikeResponseDTO } from "../schemas/like.dto";

export const useLike = () => {
  const queryClient = useQueryClient();

  const { isPending: isPendingLike, mutateAsync: mutateLike } = useMutation<
    LikeResponseDTO,
    Error,
    LikeDTO
  >({
    mutationKey: ["like"],
    mutationFn: async (data: LikeDTO) => {
      const response = await api.post<LikeResponseDTO>("/likes", data);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
      toast.error("Something went wrong!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });

  const handleLike = async (data: LikeDTO) => {
    await mutateLike(data);
  };

  const { isPending: isPendingUnlike, mutateAsync: mutateUnlike } = useMutation<
    LikeResponseDTO,
    Error,
    UnlikeDTO
  >({
    mutationKey: ["unlike"],
    mutationFn: async (data: UnlikeDTO) => {
      const response = await api.delete<LikeResponseDTO>(
        `/likes/${data.threadId}`
      );
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }
      toast.error("Something went wrong!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });

  const handleUnlike = async (data: UnlikeDTO) => {
    await mutateUnlike(data);
  };

  return {
    isPendingLike,
    handleLike,
    isPendingUnlike,
    handleUnlike,
  };
};
