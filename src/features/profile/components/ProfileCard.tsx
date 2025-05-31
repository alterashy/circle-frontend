import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UserRoundPen } from "lucide-react";
import ProfileEditDialog from "./ProfileEditDialog";

const ProfileCard = () => {
  return (
    <div>
      <div className="bg-secondary - rounded-md p-4 w-full relative">
        <div className="flex flex-col gap-4">
          <div>
            {/* Banner */}
            <div className="relative group">
              <div className="h-12 w-full rounded-md bg-gradient-to-r from-lime-300 via-green-200 to-yellow-300 overflow-hidden cursor-pointer"></div>
              {/* Avatar */}
              <div className="absolute -bottom-4 left-4">
                <Avatar className="w-16 h-16 border-4 border-accent-foreground">
                  <AvatarImage src={"https://github.com/shadcn.png"} />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
              </div>
              {/* Edit Profile Button */}
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
            <h3 className="font-bold">Syifa Maulaya</h3>
            <span className="text-gray-600 text-xs">@alterashy</span>
            <span className="text-xs">Your'e not a cat-be curious.</span>
            <div className="flex flex-row gap-1 items-baseline">
              <span className="text-xs">292</span>
              <span className="text-gray-600 text-xs">Followings</span>
              <span className="text-xs">127</span>
              <span className="text-gray-600 text-xs">Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
