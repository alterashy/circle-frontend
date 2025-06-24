import { api } from "@/lib/api";
import {
  UpdateProfileSchema,
  UpdateProfileSchemaDTO,
} from "@/schemas/profile.schema";
import { useAuthStore } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useProfileUpdate = () => {
  const currentUser = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const avatarFile = e.target.files?.[0];
    if (avatarFile) setAvatarUrl(URL.createObjectURL(avatarFile));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bannerFile = e.target.files?.[0];
    if (bannerFile) setBannerUrl(URL.createObjectURL(bannerFile));
  };

  const handleRemoveFile = () => {
    setAvatarUrl(null);
    setBannerUrl(null);
    if (avatarInputRef.current?.value) {
      avatarInputRef.current.value = "";
    }
    if (bannerInputRef.current?.value) {
      bannerInputRef.current.value = "";
    }
    avatarInputRef.current && (avatarInputRef.current.value = "");
    bannerInputRef.current && (bannerInputRef.current.value = "");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileSchemaDTO>({
    mode: "onSubmit",
    resolver: zodResolver(UpdateProfileSchema),
  });

  const {
    ref: registerAvatarRef,
    onChange: registerAvatarChange,
    ...restRegisterAvatar
  } = register("avatarUrl");

  const {
    ref: registerBannerRef,
    onChange: registerBannerChange,
    ...restRegisterBanner
  } = register("bannerUrl");

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (data: UpdateProfileSchemaDTO) => {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("username", data.username);
      formData.append("bio", data.bio);
      if (data.avatarUrl && data.avatarUrl.length > 0) {
        formData.append("avatarUrl", data.avatarUrl[0]);
      }
      if (data.bannerUrl && data.bannerUrl.length > 0) {
        formData.append("bannerUrl", data.bannerUrl[0]);
      }
      const response = await api.patch(`/profile/${currentUser.id}`, formData);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error.response?.data.message);
        return toast.error(error.response?.data.message);
      }
      toast.error("Something went wrong!");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users", currentUser.username],
      });
      toast.success("Profile updated successfully!");
    },
  });

  const onSubmitUpdate = async (data: UpdateProfileSchemaDTO) => {
    await mutateAsync(data);
    handleRemoveFile();
  };

  return {
    register,
    avatarUrl,
    bannerUrl,
    avatarInputRef,
    bannerInputRef,
    handleAvatarChange,
    handleBannerChange,
    handleRemoveFile,
    registerAvatarRef,
    registerBannerRef,
    registerAvatarChange,
    registerBannerChange,
    restRegisterAvatar,
    restRegisterBanner,
    errors,
    isPending,
    handleSubmit,
    mutateAsync,
    onSubmitUpdate,
  };
};
