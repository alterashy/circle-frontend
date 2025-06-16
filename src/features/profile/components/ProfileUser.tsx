import { gradientBanner } from "@/assets";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import { UserRoundPen } from "lucide-react";
import { ProfileEditDialog } from "./ProfileEditDialog";

export const ProfileUser = () => {
  const currentUser = useAuthStore((state) => state.user);

  const {
    data: userProfile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", currentUser?.username],
    queryFn: async () => {
      const response = await api.get(`/users/profile/${currentUser?.username}`);
      return response.data;
    },
    enabled: !!currentUser?.username,
  });

  if (isError) {
    console.log("Error: ", error.message);
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!userProfile) {
    return <p>Profile not found</p>;
  }

  return (
    <div>
      <div>
        <div className="bg-secondary - rounded-md p-4 w-full relative">
          <div className="flex flex-col gap-4">
            <div>
              <div className="relative group">
                <div className="h-14 w-full rounded-md overflow-hidden">
                  <img
                    src={userProfile?.profile?.bannerUrl || gradientBanner}
                    alt="banner"
                  />
                </div>
                <div className="absolute top-8 left-6">
                  <Avatar className="size-12 ring-2 ring-offset-[3px] ring-offset-background">
                    <AvatarImage
                      src={
                        userProfile?.profile?.avatarUrl ||
                        `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${userProfile?.profile?.fullName}`
                      }
                    />
                  </Avatar>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="absolute top-16 right-0 px-4 py-0.75 text-xs"
                    >
                      <UserRoundPen /> Edit Profile
                    </Button>
                  </DialogTrigger>
                  <ProfileEditDialog />
                </Dialog>
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-6 items-baseline">
              <h3 className="font-bold">{userProfile?.profile?.fullName}</h3>
              <span className="text-gray-600 text-xs">
                @{userProfile?.username}
              </span>
              <span className="flex text-xs">{userProfile?.profile?.bio}</span>
              <div className="flex flex-row gap-1 items-baseline">
                <span className="text-xs">{userProfile?.followers.length}</span>
                <span className="text-gray-600 text-xs">Followers</span>
                <span className="text-xs">
                  {userProfile?.followings.length}
                </span>
                <span className="text-gray-600 text-xs">Followings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
