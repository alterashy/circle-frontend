import { DumbWaysIcon, GithubIcon, InstagramIcon, LinkedinIcon } from "@/assets";
import ProfileUser from "@/features/profile/components/ProfileUser";
import { useLocation } from "@tanstack/react-router";

const RightBar = () => {
  const { pathname } = useLocation();
  // const { username } = useAuthStore((state) => state.user);

  return (
    <div>
      <div className="flex flex-col gap-4">
        {pathname === "/profile" ? (
          <div className="hidden">
            <ProfileUser />
          </div>
        ) : (
          <div>
            <ProfileUser />
          </div>
        )}
        <div className="flex flex-col gap-1.5 w-full p-4 rounded bg-secondary text-xs">
          Follow Suggestion
        </div>
        <div className="flex flex-col gap-2 w-full p-4 rounded bg-secondary text-xs">
          <span className="flex gap-1 text-xs items-center">
            Developed by Syifa Maulaya •
            <a href="https://github.com/alterashy">
              <img src={GithubIcon} alt="github" className="size-4" />
            </a>
            <a href="https://www.linkedin.com/in/syifamaulaya/">
              <img src={LinkedinIcon} alt="linkedin" className="size-4" />
            </a>
            <a href="https://www.instagram.com/alterashy/">
              <img src={InstagramIcon} alt="instagram" className="size-4" />
            </a>
          </span>
          <span className="flex gap-1 text-xs text-muted-foreground items-center">
            Powered by
            <a href="https://dumbways.id/">
              <img src={DumbWaysIcon} alt="dumbways.id" className="h-4 object-contain" />
            </a>
            DumbWays Indonesia.
          </span>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
