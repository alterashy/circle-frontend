import { api } from "@/lib/api";
import {
  resetPasswordSchema,
  ResetPasswordSchemaDTO,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ResetPasswordResponse {
  message: string;
  data: {
    id: string;
    email: string;
    updatedAt: string;
    tokenId: string;
  };
}

export function useResetPasswordForm() {
  const resetPasswordForm = useForm<ResetPasswordSchemaDTO>({
    mode: "all",
    resolver: zodResolver(resetPasswordSchema),
  });
  const navigate = useNavigate();
  const { tokenId } = useParams({ from: "/(auth)/reset-password/$tokenId" });

  const { isPending, mutateAsync } = useMutation<
    ResetPasswordResponse,
    Error,
    ResetPasswordSchemaDTO
  >({
    mutationKey: ["reset-password"],
    mutationFn: async ({
      oldPassword,
      newPassword,
    }: ResetPasswordSchemaDTO) => {
      const response = await api.post<ResetPasswordResponse>(
        "/auth/reset-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );

      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message);
      }

      toast.error("Something went wrong!");
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      navigate({ to: "/login" });
    },
  });

  async function onSubmit(data: ResetPasswordSchemaDTO) {
    await mutateAsync(data);
  }

  return {
    resetPasswordForm,
    isPending,
    onSubmit,
  };
}
