import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

export const ProfileEditDialog = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarUrl(URL.createObjectURL(file));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setBannerUrl(URL.createObjectURL(file));
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {/* Banner */}
        <div className="relative group">
          <div
            className="h-12 w-full rounded-md bg-gradient-to-r from-lime-300 via-green-200 to-yellow-300 overflow-hidden cursor-pointer"
            onClick={() => bannerInputRef.current?.click()}
          >
            {bannerUrl && (
              <img
                src={bannerUrl}
                alt="Banner"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={bannerInputRef}
            onChange={handleBannerChange}
            className="hidden"
          />
          {/* Avatar */}
          <div
            className="absolute -bottom-8 left-4 cursor-pointer"
            onClick={() => avatarInputRef.current?.click()}
          >
            <Avatar className="w-15 h-15 border-4 border-accent-foreground">
              <AvatarImage src={avatarUrl ?? "/default-avatar.png"} />
              <AvatarFallback>
                <Camera />
              </AvatarFallback>
            </Avatar>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={avatarInputRef}
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4 mt-6">
          <Label htmlFor="fullname" className="text-right">
            Fullname
          </Label>
          <Input
            id="fullname"
            defaultValue="Pedro Duarte"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input
            id="username"
            defaultValue="Pedro Duarte"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="bio" className="text-right">
            Bio
          </Label>
          <Input id="bio" defaultValue="@peduarte" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
};
