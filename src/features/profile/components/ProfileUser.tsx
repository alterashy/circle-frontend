import { gradientBanner } from "@/assets";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/auth.store";
import { UserRoundPen } from "lucide-react";
import { ProfileEditDialog } from "./ProfileEditDialog";

export const ProfileUser = () => {
  const {
    username,
    profile: { fullName, bio, bannerUrl, avatarUrl },
  } = useAuthStore((state) => state.user);

  const profileBanner = bannerUrl || gradientBanner;

  return (
    <div>
      <div>
        <div className="bg-secondary - rounded-md p-4 w-full relative">
          <div className="flex flex-col gap-4">
            <div>
              <div className="relative group">
                <div className="h-12 w-full rounded-md overflow-hidden">
                  <img src={profileBanner} alt="banner" />
                </div>
                <div className="absolute -bottom-4 left-4">
                  <Avatar className="w-16 h-16 border-4 border-accent-foreground">
                    <AvatarImage
                      src={
                        avatarUrl ||
                        `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${fullName}`
                      }
                    />
                  </Avatar>
                </div>
                <Dialog>
                  <DialogTrigger>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="absolute top-15 right-0 px-4 py-0.75 text-xs"
                    >
                      <UserRoundPen /> Edit Profile
                    </Button>
                  </DialogTrigger>
                  <ProfileEditDialog />
                </Dialog>
              </div>
            </div>
            <div className="flex flex-col gap-1.25 mt-4 items-baseline">
              <h3 className="font-bold">{fullName}</h3>
              <span className="text-gray-600 text-xs">@{username}</span>
              <span className="flex text-xs">{bio}</span>
              <div className="flex flex-row gap-1 items-baseline">
                <span className="text-xs">0</span>
                <span className="text-gray-600 text-xs">Followings</span>
                <span className="text-xs">0</span>
                <span className="text-gray-600 text-xs">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
