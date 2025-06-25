import { api } from "@/lib/api";
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaDTO,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError, isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function useForgotPasswordForm() {
  const navigate = useNavigate();
  const forgotPasswordForm = useForm<ForgotPasswordSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { isPending, mutateAsync } = useMutation<
    { message: string },
    AxiosError,
    ForgotPasswordSchemaDTO
  >({
    mutationKey: ["forgot-password"],
    mutationFn: async ({ email }: ForgotPasswordSchemaDTO) => {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast.error(error.message);
      }

      toast.error("Something went wrong!");
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      navigate({ to: "/login" });
    },
  });

  async function onSubmit(data: ForgotPasswordSchemaDTO) {
    await mutateAsync(data);
  }

  return {
    forgotPasswordForm,
    isPending,
    onSubmit,
  };
}
