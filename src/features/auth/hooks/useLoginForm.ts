import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginSchema, type LoginSchemaDTO } from "../schemas/auth.schemas";
import { useAuthStore } from "@/stores/auth.store";
import { UserEntity } from "@/entities/user.entity";
import { ProfileEntity } from "@/entities/profile.entity";

type UserProfile = UserEntity & {
  profile: ProfileEntity;
};

interface LoginResponse {
  message: string;
  data: {
    token: string;
    user: UserProfile;
  };
}

const useLoginForm = () => {
  const loginForm = useForm<LoginSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const { isPending, mutateAsync: mutateLogin } = useMutation<LoginResponse, Error, LoginSchemaDTO>(
    {
      mutationKey: ["login"],
      mutationFn: async (data: LoginSchemaDTO) => {
        const response = await api.post<LoginResponse>("/auth/login", data);
        setUser(response.data.data.user);
        Cookies.set("token", response.data.data.token, {
          expires: 1,
        });
        return response.data;
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          return toast.error(error.response?.data.message);
        }
        toast.error("Something Went wrong!");
      },
      onSuccess: async (data) => {
        toast.success(data.message, { autoClose: 1000 });
        navigate({ to: "/" });
      },
    }
  );

  const onSubmit = async (data: LoginSchemaDTO) => {
    await mutateLogin(data);
  };

  return {
    loginForm,
    isPending,
    onSubmit,
  };
};

export default useLoginForm;
