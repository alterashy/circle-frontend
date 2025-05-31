import PostForm from "@/features/home/components/PostForm";
import { useAuthStore } from "@/stores/auth.store";
import { Link, useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import {
  CircleUserRound,
  House,
  LogOut,
  SquarePlus,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ModeToggle } from "./ModeToggle";

const activeProps = {
  style: {
    fontWeight: "bold",
    color: "#00BC7D",
  },
};

const LeftBar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    Cookies.remove("token");
    navigate({ to: "/login" });
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex flex-col gap-8">
        <div>
          <Link to="/" activeProps={activeProps}>
            <h1 className="font-bold text-3xl text-primary">Circle</h1>
          </Link>
        </div>
        <div>
          <Link to="/" activeProps={activeProps}>
            <div className="flex gap-2">
              <House />
              Home
            </div>
          </Link>
        </div>
        <div>
          <Link to="/search" activeProps={activeProps}>
            <div className="flex gap-2">
              <UserRoundSearch />
              Search
            </div>
          </Link>
        </div>
        <div>
          <Link to="/follow" activeProps={activeProps}>
            <div className="flex gap-2">
              <UsersRound />
              Follow
            </div>
          </Link>
        </div>
        <div>
          <Link to="/profile" activeProps={activeProps}>
            <div className="flex gap-2">
              <CircleUserRound />
              Profile
            </div>
          </Link>
        </div>
        <div>
          <Dialog>
            <DialogTrigger className="w-full">
              <Button className="w-full">
                <SquarePlus />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-2">Create Post</DialogTitle>
                <div className="w-full">
                  <PostForm />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          type="submit"
          onClick={handleLogout}
          variant={"outline"}
          className=" cursor-pointer"
        >
          <LogOut />
          Logout
        </Button>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
