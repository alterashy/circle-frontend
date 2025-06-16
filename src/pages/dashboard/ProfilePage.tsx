import { Separator } from "@/components/ui/separator";
import { ProfileUser } from "@/features/profile/components/ProfileUser";

export const ProfilePage = () => {
  return (
    <div>
      <ProfileUser />
      <Separator className="my-4" />
    </div>
  );
};
