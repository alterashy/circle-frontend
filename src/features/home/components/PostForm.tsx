import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/stores/auth.store";
import { ImagePlus, Send, XSquareIcon } from "lucide-react";
import { usePost } from "../hooks/usePost";

export const PostForm = () => {
  const {
    user: {
      profile: { fullName, avatarUrl },
    },
  } = useAuthStore();

  const {
    inputRef,
    previewURL,
    handleInputFile,
    handleFileChange,
    handleRemoveFile,
    onSubmitPost,
    register,
    handleSubmit,
    errors,
    registerImageRef,
    registerImageOnChange,
    isPending,
    ...restRegisterImage
  } = usePost();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitPost)}>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage
              src={
                avatarUrl ||
                `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${fullName}`
              }
              alt="user-avatar"
            />
          </Avatar>
          <Textarea
            {...register("content")}
            placeholder="What's on your mind?"
          />
          <Input
            {...restRegisterImage}
            id="picture"
            type="file"
            accept="image/*"
            ref={(e) => {
              registerImageRef(e);
              inputRef.current = e;
            }}
            onChange={(e) => {
              registerImageOnChange(e);
              handleFileChange(e);
            }}
            className="hidden"
          />
          <div className="flex flex-col gap-3">
            <Button type="submit" size={"icon"}>
              {isPending ? <Spinner size={"small"} /> : <Send />}
            </Button>
            <Button
              onClick={handleInputFile}
              type="button"
              size={"icon"}
              variant={"outline"}
            >
              <ImagePlus className="text-primary" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between ml-12 mt-4">
          {errors.content && (
            <p className="text-xs text-muted-foreground">
              {errors.content.message}
            </p>
          )}
        </div>
        <div>
          {previewURL && (
            <div className="relative inline-block ml-12">
              <Separator className="my-4" />
              <img
                src={previewURL}
                alt="image preview"
                className="w-full object-contain rounded border md:w-1/2 md:h-1/2"
              />
              <Button
                onClick={handleRemoveFile}
                variant={"destructive"}
                size={"icon"}
                className="absolute top-10 left-2"
              >
                <XSquareIcon />
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
