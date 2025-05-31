import { Separator } from "@/components/ui/separator";
import ProfileUser from "@/features/profile/components/ProfileUser";

const ProfilePage = () => {
  return (
    <div>
      <ProfileUser />
      <Separator className="my-4" />
    </div>
  );
};

export default ProfilePage;
