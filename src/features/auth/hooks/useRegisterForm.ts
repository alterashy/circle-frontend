import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  registerSchema,
  type RegisterSchemaDTO,
} from "../schemas/auth.schemas";

interface RegisterFormResponse {
  message: string;
  data: {
    id: string;
    fullname: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const useRegisterForm = () => {
  const registerForm = useForm<RegisterSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation<
    RegisterFormResponse,
    Error,
    RegisterSchemaDTO
  >({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterSchemaDTO) => {
      const response = await api.post<RegisterFormResponse>(
        "/auth/register",
        data
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
      toast.success(data.message, { autoClose: 1000 });
      navigate({ to: "/login" });
    },
  });

  const onSubmit = async (data: RegisterSchemaDTO) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return {
    registerForm,
    isPending,
    onSubmit,
  };
};
